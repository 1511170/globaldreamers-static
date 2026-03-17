/**
 * Currency API Service - Tasas de cambio en tiempo real
 * Usa exchangerate-api.com (gratis) con fallback a open.er-api.com
 */

// Tasas de respaldo (actualizadas manualmente cuando sea necesario)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  AUD: 1.56,
  CAD: 1.44,
  EUR: 0.93,
  GBP: 0.79,
  NZD: 1.72,
  AED: 3.67,
  CLP: 920,      // Ajustado: 16 Marzo 2026
  COP: 3691,     // Ajustado: 16 Marzo 2026 (TRM real)
  MXN: 20.1,     // Ajustado: 16 Marzo 2026
};

// Cache en memoria
interface CacheEntry {
  rate: number;
  timestamp: number;
}

class CurrencyAPIService {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutos
  private lastFetchTime: number = 0;
  private isFetching: boolean = false;

  /**
   * Obtiene tasas de cambio desde API o cache
   */
  async getRates(): Promise<{
    rates: Record<string, number>;
    source: 'api' | 'cache' | 'fallback';
    lastUpdated: string;
  }> {
    // Verificar cache primero
    const cached = this.getFromCache();
    if (cached) {
      return {
        rates: cached,
        source: 'cache',
        lastUpdated: new Date(this.lastFetchTime).toISOString(),
      };
    }

    // Si ya estamos fetcheando, esperar
    if (this.isFetching) {
      await this.waitForFetch();
      const cachedAfter = this.getFromCache();
      if (cachedAfter) {
        return {
          rates: cachedAfter,
          source: 'cache',
          lastUpdated: new Date(this.lastFetchTime).toISOString(),
        };
      }
    }

    // Intentar obtener de API
    try {
      const apiRates = await this.fetchFromAPI();
      this.cacheRates(apiRates);
      return {
        rates: apiRates,
        source: 'api',
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.warn('[CurrencyAPI] API failed, using fallback:', error);
      return {
        rates: FALLBACK_RATES,
        source: 'fallback',
        lastUpdated: '2026-03-16', // Fecha de última actualización manual
      };
    }
  }

  /**
   * Obtiene tasa específica
   */
  async getRate(currency: string): Promise<number> {
    const { rates } = await this.getRates();
    return rates[currency] || FALLBACK_RATES[currency] || 1;
  }

  /**
   * Convierte monto entre monedas
   */
  async convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    if (fromCurrency === toCurrency) return amount;

    const rates = await this.getRates();
    const fromRate = rates[fromCurrency] || FALLBACK_RATES[fromCurrency] || 1;
    const toRate = rates[toCurrency] || FALLBACK_RATES[toCurrency] || 1;

    // Convertir a USD primero, luego a destino
    const usdAmount = amount / fromRate;
    return usdAmount * toRate;
  }

  /**
   * Fuerza actualización de tasas
   */
  async refreshRates(): Promise<void> {
    this.cache.clear();
    await this.getRates();
  }

  /**
   * Obtiene mensaje de estado para UI
   */
  async getStatus(): Promise<{
    isLive: boolean;
    lastUpdated: string;
    source: string;
  }> {
    const { source, lastUpdated } = await this.getRates();
    return {
      isLive: source === 'api' || source === 'cache',
      lastUpdated,
      source: source === 'api' ? 'Tiempo real' : source === 'cache' ? 'Caché' : 'Referencia',
    };
  }

  private async fetchFromAPI(): Promise<Record<string, number>> {
    this.isFetching = true;

    try {
      // Intentar open.er-api.com primero (no requiere API key)
      const response = await fetch('https://open.er-api.com/v6/latest/USD', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.result !== 'success' || !data.rates) {
        throw new Error('Invalid API response');
      }

      // Mapear tasas relevantes
      const rates: Record<string, number> = {
        USD: 1,
        AUD: data.rates.AUD,
        CAD: data.rates.CAD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP,
        NZD: data.rates.NZD,
        AED: data.rates.AED,
        CLP: data.rates.CLP,
        COP: data.rates.COP,
        MXN: data.rates.MXN,
      };

      // Validar que las tasas son razonables (evitar errores de API)
      this.validateRates(rates);

      return rates;
    } finally {
      this.isFetching = false;
    }
  }

  private validateRates(rates: Record<string, number>): void {
    // Validar que COP está en rango razonable (3000-5000)
    if (rates.COP < 3000 || rates.COP > 5000) {
      console.warn(`[CurrencyAPI] COP rate seems off: ${rates.COP}, using fallback`);
      rates.COP = FALLBACK_RATES.COP;
    }

    // Validar otras monedas clave
    if (rates.MXN < 15 || rates.MXN > 30) {
      rates.MXN = FALLBACK_RATES.MXN;
    }

    if (rates.CLP < 700 || rates.CLP > 1200) {
      rates.CLP = FALLBACK_RATES.CLP;
    }
  }

  private getFromCache(): Record<string, number> | null {
    if (this.cache.size === 0) return null;

    const now = Date.now();
    const firstEntry = this.cache.values().next().value as CacheEntry | undefined;

    if (!firstEntry || now - firstEntry.timestamp > this.CACHE_DURATION) {
      this.cache.clear();
      return null;
    }

    const rates: Record<string, number> = {};
    this.cache.forEach((entry, currency) => {
      rates[currency] = entry.rate;
    });

    return rates;
  }

  private cacheRates(rates: Record<string, number>): void {
    const now = Date.now();
    this.lastFetchTime = now;

    Object.entries(rates).forEach(([currency, rate]) => {
      this.cache.set(currency, { rate, timestamp: now });
    });
  }

  private waitForFetch(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (!this.isFetching) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }
}

// Exportar singleton
export const currencyAPI = new CurrencyAPIService();

// Exportar tasas fallback para uso offline
export { FALLBACK_RATES };

// Tipos
export interface CurrencyStatus {
  isLive: boolean;
  lastUpdated: string;
  source: string;
}

export interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  rate: number;
  timestamp: string;
}

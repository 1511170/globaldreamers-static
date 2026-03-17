/**
 * Currency Converter Universal - Conversión directa entre cualquier par de monedas
 * Soporta: COP, MXN, CLP, USD (Latam) ↔ AUD, CAD, EUR, GBP, NZD, AED, USD (Destinos)
 * 
 * Fórmula: monto_destino = monto_origen × (tasa_destino / tasa_origen)
 * Base: USD (1 USD = X moneda)
 */

// Tasas base respecto a USD (actualizadas: 16 Marzo 2026)
export const CURRENCY_RATES: Record<string, number> = {
  // Monedas de destino
  USD: 1,
  AUD: 1.56,
  CAD: 1.44,
  EUR: 0.93,
  GBP: 0.79,
  NZD: 1.72,
  AED: 3.67,
  
  // Monedas latinoamericanas
  COP: 3691,
  MXN: 20.1,
  CLP: 920,
};

// Información de monedas para UI
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate: number;
  type: 'latam' | 'destination';
  decimals: number;
}

export const CURRENCIES: Currency[] = [
  // Latinoamérica
  { code: 'COP', name: 'Peso Colombiano', symbol: '$', flag: 'co', rate: CURRENCY_RATES.COP, type: 'latam', decimals: 0 },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', flag: 'mx', rate: CURRENCY_RATES.MXN, type: 'latam', decimals: 0 },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', flag: 'cl', rate: CURRENCY_RATES.CLP, type: 'latam', decimals: 0 },
  { code: 'USD', name: 'Dólar Americano', symbol: 'US$', flag: 'us', rate: CURRENCY_RATES.USD, type: 'latam', decimals: 0 },
  
  // Destinos
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', flag: 'au', rate: CURRENCY_RATES.AUD, type: 'destination', decimals: 0 },
  { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$', flag: 'ca', rate: CURRENCY_RATES.CAD, type: 'destination', decimals: 0 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: 'eu', rate: CURRENCY_RATES.EUR, type: 'destination', decimals: 0 },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£', flag: 'gb', rate: CURRENCY_RATES.GBP, type: 'destination', decimals: 0 },
  { code: 'NZD', name: 'Dólar Neozelandés', symbol: 'NZ$', flag: 'nz', rate: CURRENCY_RATES.NZD, type: 'destination', decimals: 0 },
  { code: 'AED', name: 'Dirham Emirates', symbol: 'AED', flag: 'ae', rate: CURRENCY_RATES.AED, type: 'destination', decimals: 0 },
];

// Mapa rápido de código a moneda
export const CURRENCY_MAP: Record<string, Currency> = CURRENCIES.reduce((acc, curr) => {
  acc[curr.code] = curr;
  return acc;
}, {} as Record<string, Currency>);

/**
 * Convierte monto entre dos monedas cualquiera
 * Fórmula: monto × (tasa_destino / tasa_origen)
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number> = CURRENCY_RATES
): number {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  
  if (!fromRate || !toRate) {
    console.warn(`[CurrencyConverter] Tasa no encontrada: ${fromCurrency} → ${toCurrency}`);
    return amount;
  }
  
  // Fórmula universal: monto × (tasa_destino / tasa_origen)
  const converted = amount * (toRate / fromRate);
  
  return converted;
}

/**
 * Formatea monto según la moneda
 */
export function formatCurrencyAmount(
  amount: number,
  currencyCode: string,
  useSymbol: boolean = true
): string {
  const currency = CURRENCY_MAP[currencyCode];
  if (!currency) return `${amount} ${currencyCode}`;
  
  const formatted = amount.toLocaleString('es-ES', {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });
  
  if (useSymbol) {
    return `${currency.symbol}${formatted}`;
  }
  return `${formatted} ${currencyCode}`;
}

/**
 * Obtiene tasa de cambio directa entre dos monedas
 * Ejemplo: getExchangeRate('COP', 'AUD') = 0.000422 (1 COP = 0.000422 AUD)
 */
export function getExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number> = CURRENCY_RATES
): number {
  if (fromCurrency === toCurrency) return 1;
  
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  
  if (!fromRate || !toRate) return 0;
  
  return toRate / fromRate;
}

/**
 * Detecta moneda desde string de costo
 */
export function detectCurrencyFromString(costString: string): string {
  const upper = costString.toUpperCase();
  
  if (upper.includes('AUD')) return 'AUD';
  if (upper.includes('CAD')) return 'CAD';
  if (upper.includes('EUR') || upper.includes('€')) return 'EUR';
  if (upper.includes('GBP') || upper.includes('£')) return 'GBP';
  if (upper.includes('NZD')) return 'NZD';
  if (upper.includes('AED')) return 'AED';
  if (upper.includes('COP')) return 'COP';
  if (upper.includes('MXN')) return 'MXN';
  if (upper.includes('CLP')) return 'CLP';
  if (upper.includes('USD') || upper.includes('US$')) return 'USD';
  
  return 'USD'; // Default
}

/**
 * Extrae número de string de costo
 */
export function extractAmount(costString: string): number {
  const match = costString.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

/**
 * Convierte string de costo completo a otra moneda
 */
export function convertCostString(
  costString: string,
  toCurrency: string,
  rates: Record<string, number> = CURRENCY_RATES
): string {
  const amount = extractAmount(costString);
  const fromCurrency = detectCurrencyFromString(costString);
  
  if (fromCurrency === toCurrency) return costString;
  
  const converted = convertCurrency(amount, fromCurrency, toCurrency, rates);
  const currency = CURRENCY_MAP[toCurrency];
  
  const formatted = converted.toLocaleString('es-ES', {
    minimumFractionDigits: currency?.decimals || 0,
    maximumFractionDigits: currency?.decimals || 0,
  });
  
  const prefix = costString.toLowerCase().includes('desde') ? 'Desde ' : '';
  const suffix = currency?.code && !['USD', 'EUR', 'GBP'].includes(currency.code) ? ` ${currency.code}` : '';
  
  return `${prefix}${currency?.symbol || ''}${formatted}${suffix}`;
}

/**
 * Obtiene descripción de tasa para UI
 */
export function getRateDescription(
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number> = CURRENCY_RATES
): string {
  const rate = getExchangeRate(fromCurrency, toCurrency, rates);
  const from = CURRENCY_MAP[fromCurrency];
  const to = CURRENCY_MAP[toCurrency];
  
  if (!from || !to) return '';
  
  // Formatear según magnitud
  let rateStr: string;
  if (rate < 0.01) {
    rateStr = rate.toExponential(2);
  } else if (rate < 1) {
    rateStr = rate.toFixed(4);
  } else {
    rateStr = Math.round(rate).toLocaleString('es-ES');
  }
  
  return `1 ${from.code} = ${to.symbol}${rateStr} ${to.code}`;
}

// Ejemplos de uso:
// convertCurrency(1000000, 'COP', 'AUD') → ~422 AUD
// convertCurrency(5000, 'EUR', 'COP') → ~19,844,086 COP
// convertCurrency(10000, 'USD', 'EUR') → ~9,300 EUR

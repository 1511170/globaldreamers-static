// Tasas de cambio base (actualizadas: Marzo 2025)
// Tasas respecto a USD (1 USD = X moneda)
export const EXCHANGE_RATES: Record<string, number> = {
  // Monedas de destino
  USD: 1,
  AUD: 1.56,      // 1 USD = 1.56 AUD
  CAD: 1.44,      // 1 USD = 1.44 CAD
  EUR: 0.93,      // 1 USD = 0.93 EUR
  GBP: 0.79,      // 1 USD = 0.79 GBP
  NZD: 1.72,      // 1 USD = 1.72 NZD
  AED: 3.67,      // 1 USD = 3.67 AED (Dubai)
  
  // Monedas latinoamericanas
  CLP: 950,       // 1 USD = 950 CLP (Chile)
  COP: 4120,      // 1 USD = 4,120 COP (Colombia)
  MXN: 20.5,      // 1 USD = 20.5 MXN (México)
};

// Países latinoamericanos objetivo
export const LATAM_COUNTRIES = [
  { code: 'CL', name: 'Chile', currency: 'CLP', flag: '🇨🇱', rate: 950 },
  { code: 'CO', name: 'Colombia', currency: 'COP', flag: '🇨🇴', rate: 4120 },
  { code: 'EC', name: 'Ecuador', currency: 'USD', flag: '🇪🇨', rate: 1 },
  { code: 'MX', name: 'México', currency: 'MXN', flag: '🇲🇽', rate: 20.5 },
  { code: 'PA', name: 'Panamá', currency: 'USD', flag: '🇵🇦', rate: 1 },
] as const;

// Función para convertir montos
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
  const toRate = EXCHANGE_RATES[toCurrency] || 1;
  
  // Convertir a USD primero, luego a destino
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}

// Formatear número según moneda
export function formatCurrency(amount: number, currency: string): string {
  const formatOptions: Record<string, { symbol: string; decimals: number; suffix?: string }> = {
    CLP: { symbol: '$', decimals: 0, suffix: ' CLP' },
    COP: { symbol: '$', decimals: 0, suffix: ' COP' },
    MXN: { symbol: '$', decimals: 0, suffix: ' MXN' },
    USD: { symbol: 'US$', decimals: 0 },
    AUD: { symbol: 'A$', decimals: 0 },
    CAD: { symbol: 'C$', decimals: 0 },
    EUR: { symbol: '€', decimals: 0 },
    GBP: { symbol: '£', decimals: 0 },
    NZD: { symbol: 'NZ$', decimals: 0 },
    AED: { symbol: 'AED ', decimals: 0 },
  };

  const format = formatOptions[currency] || { symbol: '$', decimals: 0 };
  const formatted = amount.toLocaleString('es-ES', {
    minimumFractionDigits: format.decimals,
    maximumFractionDigits: format.decimals,
  });
  
  return `${format.symbol}${formatted}${format.suffix || ''}`;
}

// Extraer número de string de costo
export function parseCost(costString: string): number {
  // Extraer números del string (ej: "Desde AUD $5,760" → 5760)
  const match = costString.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// Detectar moneda del string de costo
export function detectCurrency(costString: string): string {
  if (costString.includes('AUD')) return 'AUD';
  if (costString.includes('CAD')) return 'CAD';
  if (costString.includes('EUR') || costString.includes('€')) return 'EUR';
  if (costString.includes('GBP') || costString.includes('£')) return 'GBP';
  if (costString.includes('NZD')) return 'NZD';
  if (costString.includes('AED')) return 'AED';
  if (costString.includes('USD') || costString.includes('US$')) return 'USD';
  return 'USD';
}

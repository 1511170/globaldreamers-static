/**
 * Configuración del sitio: Global Dreamers
 *
 * Domains:
 * - Public: globaldreamers.com
 * - CMS (oculto): glo.kinto.info
 */

export interface SiteConfig {
  site: {
    domain: string;
    name: string;
    description: string;
    language: string;
    logo?: string;
    favicon?: string;
  };
  cms: {
    enabled: boolean;
    subdomain: string;
    hidden: boolean;
    githubRepo: string;
    authEndpoint?: string;
  };
  build: {
    output: 'static';
    compressHTML: boolean;
    inlineStylesheets: 'auto' | 'always' | 'never';
  };
  skills: {
    // Skills activas se leen de skills-active.json
  };
  analytics?: {
    /** GA4 Measurement ID (G-xxxxxxxx). Vacío = solo Google Ads como cargador gtag. */
    ga4MeasurementId?: string;
    /** Google Ads conversion tag ID */
    googleAdsId?: string;
    /** Valor send_to de la acción de conversión en Google Ads */
    googleAdsConversionSendTo?: string;
  };
}

export default {
  site: {
    domain: 'globaldreamers.com',
    name: 'Global Dreamers',
    description: 'Agencia de estudios internacionales dedicada a hacer realidad tus sueños de vivir y trabajar en el exterior.',
    language: 'es',
    logo: '/logo.svg',
    favicon: '/favicon.svg'
  },
  cms: {
    enabled: true,
    subdomain: 'glo.kinto.info',
    hidden: true,
    githubRepo: 'kinto-cms/globaldreamers-content',
    authEndpoint: 'https://glo-auth.kinto.workers.dev'
  },
  build: {
    output: 'static',
    compressHTML: true,
    inlineStylesheets: 'auto'
  },
  skills: {},
  analytics: {
    ga4MeasurementId: 'G-DZZEVSKDEG',
    googleAdsId: 'AW-18002682558',
    googleAdsConversionSendTo: 'AW-18002682558/r3P3CKnlv5AcEL7FrIhD'
  }
} satisfies SiteConfig;

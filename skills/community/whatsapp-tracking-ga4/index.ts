/**
 * WhatsApp Tracking GA4 - Kinto CMS Skill
 * 
 * Sistema completo de tracking de WhatsApp con Google Analytics 4
 * y Google Tag Manager. Incluye botones reutilizables, mensajes
 * enriquecidos con URL/página, y eventos de conversión automáticos.
 * 
 * @category community
 * @version 1.0.0
 * @author Global Dreamers
 */

// Componentes
export { default as WhatsAppButton } from './components/WhatsAppButton.astro';
export { default as WhatsAppFloat } from './components/WhatsAppFloat.astro';

// Utilidades
export {
  // Tipos
  type WhatsAppTrackingParams,
  type WhatsAppMessageParams,
  
  // Funciones
  generateWhatsAppMessage,
  generateWhatsAppUrl,
  trackWhatsAppClickGA4,
  initWhatsAppTracking,
  updateAllWhatsAppLinks,
} from './utils/whatsappTracking';

// Constantes
export const WHATSAPP_SKILL_VERSION = '1.0.0';
export const WHATSAPP_DEFAULT_NUMBER = '61449159849';

// Helper para verificar instalación
export function checkWhatsAppTracking(): boolean {
  return typeof window !== 'undefined' && 
         typeof window.gdTracking !== 'undefined' &&
         typeof window.dataLayer !== 'undefined';
}

// Declaración de tipos para window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    gdTracking?: {
      pageType: string;
      destinationCountry: string;
      environment?: string;
    };
  }
}

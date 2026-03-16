/**
 * Sistema de Tracking para WhatsApp - Global Dreamers
 * Integración completa con Google Analytics 4 y Google Tag Manager
 * 
 * Estructura de Eventos:
 * 
 * 1. Evento Principal: 'whatsapp_click'
 *    - Parámetros: button_variant, button_location, page_url, page_title, 
 *                  page_type, destination_country, user_intent
 * 
 * 2. Eventos Específicos según ubicación:
 *    - 'whatsapp_hero_click' - Botón en hero section
 *    - 'whatsapp_cta_click' - Botón en secciones CTA
 *    - 'whatsapp_float_click' - Botón flotante (ya implementado)
 *    - 'whatsapp_service_click' - Botón en páginas de servicios
 *    - 'whatsapp_blog_click' - Botón en artículos de blog
 *    - 'whatsapp_destination_click' - Botón en páginas de destinos
 * 
 * 3. Eventos de Conversión:
 *    - 'generate_lead' - Cuando el usuario hace click con intención de contacto
 *    - 'contact' - Evento de contacto estándar GA4
 */

export interface WhatsAppTrackingParams {
  /** Variante del botón: 'hero', 'cta', 'float', 'service', 'blog', 'destination', 'card' */
  variant: 'hero' | 'cta' | 'float' | 'service' | 'blog' | 'destination' | 'card' | 'footer' | 'testimonial';
  
  /** Ubicación específica en la página */
  location: string;
  
  /** URL de la página actual */
  pageUrl?: string;
  
  /** Título de la página */
  pageTitle?: string;
  
  /** Tipo de página: 'home', 'destination', 'blog', 'service', 'landing' */
  pageType?: string;
  
  /** País de destino (si aplica) */
  destinationCountry?: string;
  
  /** Intención del usuario (mensaje base) */
  userIntent?: string;
  
  /** Sección específica (ej: 'hero-home', 'cta-australia', 'footer') */
  section?: string;
}

export interface WhatsAppMessageParams {
  /** Mensaje base del usuario */
  baseMessage: string;
  
  /** Incluir URL en el mensaje */
  includeUrl?: boolean;
  
  /** Incluir título de página */
  includeTitle?: boolean;
  
  /** Incluir UTM parameters para tracking interno */
  includeUtm?: boolean;
  
  /** Parámetros de tracking adicionales */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const WHATSAPP_NUMBER = '61449159849';

/**
 * Genera el mensaje de WhatsApp con tracking
 */
export function generateWhatsAppMessage(params: WhatsAppMessageParams): string {
  const {
    baseMessage,
    includeUrl = true,
    includeTitle = true,
    includeUtm = true,
    utmSource = 'website',
    utmMedium = 'whatsapp',
    utmCampaign = 'organic'
  } = params;

  let message = baseMessage;
  
  if (includeTitle) {
    const pageTitle = document.title;
    message += `\n\n📄 Página: ${pageTitle}`;
  }
  
  if (includeUrl) {
    const currentUrl = window.location.href;
    // Limpiar URL de parámetros existentes para evitar duplicados
    const cleanUrl = currentUrl.split('?')[0];
    message += `\n🔗 URL: ${cleanUrl}`;
  }
  
  if (includeUtm) {
    message += `\n\n(Vía: ${utmSource} - ${utmMedium})`;
  }
  
  return encodeURIComponent(message);
}

/**
 * Genera la URL completa de WhatsApp
 */
export function generateWhatsAppUrl(
  baseMessage: string,
  trackingParams?: Partial<WhatsAppMessageParams>
): string {
  const encodedMessage = generateWhatsAppMessage({
    baseMessage,
    ...trackingParams
  });
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Envía evento a Google Analytics 4
 */
export function trackWhatsAppClickGA4(params: WhatsAppTrackingParams): void {
  const {
    variant,
    location,
    pageUrl = window.location.href,
    pageTitle = document.title,
    pageType = 'unknown',
    destinationCountry,
    userIntent,
    section
  } = params;

  // Evento principal - Nomenclatura GA4 estándar
  const mainEvent = {
    event: 'whatsapp_click',
    parameters: {
      button_variant: variant,
      button_location: location,
      page_url: pageUrl,
      page_title: pageTitle,
      page_type: pageType,
      destination_country: destinationCountry || 'general',
      user_intent: userIntent || 'general_inquiry',
      section: section || location,
      transport_type: 'beacon' // Asegura que el evento se envíe antes de navegar
    }
  };

  // Evento específico según variante
  const specificEvent = {
    event: `whatsapp_${variant}_click`,
    parameters: {
      page_url: pageUrl,
      page_title: pageTitle,
      ...(destinationCountry && { destination_country: destinationCountry })
    }
  };

  // Evento de conversión - GA4 recomendado
  const conversionEvent = {
    event: 'generate_lead',
    parameters: {
      value: 1.0,
      currency: 'USD',
      lead_source: 'whatsapp',
      lead_medium: variant,
      page_location: pageUrl
    }
  };

  // Enviar a GA4 si está disponible
  if (typeof gtag !== 'undefined') {
    // Evento principal
    gtag('event', mainEvent.event, mainEvent.parameters);
    
    // Evento específico
    gtag('event', specificEvent.event, specificEvent.parameters);
    
    // Evento de conversión
    gtag('event', conversionEvent.event, conversionEvent.parameters);
    
    console.log('[WhatsApp Tracking] GA4 Events:', {
      main: mainEvent,
      specific: specificEvent,
      conversion: conversionEvent
    });
  }

  // Enviar a dataLayer para GTM
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      ...mainEvent,
      ...mainEvent.parameters,
      event_timestamp: new Date().toISOString()
    });
    
    dataLayer.push({
      ...specificEvent,
      ...specificEvent.parameters,
      event_timestamp: new Date().toISOString()
    });
  }
}

/**
 * Inicializa el tracking para un botón de WhatsApp
 */
export function initWhatsAppTracking(
  element: HTMLElement,
  trackingParams: WhatsAppTrackingParams,
  messageParams?: WhatsAppMessageParams
): void {
  // Actualizar URL del botón si se proporcionan parámetros de mensaje
  if (messageParams) {
    const newUrl = generateWhatsAppUrl(messageParams.baseMessage, messageParams);
    element.setAttribute('href', newUrl);
  }
  
  // Agregar listener de click
  element.addEventListener('click', (e) => {
    // Track antes de navegar
    trackWhatsAppClickGA4(trackingParams);
    
    // Log para debugging
    console.log('[WhatsApp Tracking] Click:', {
      variant: trackingParams.variant,
      location: trackingParams.location,
      url: element.getAttribute('href')
    });
  });
}

/**
 * Actualiza dinámicamente todos los botones de WhatsApp en la página
 * Útil para SPA o páginas con contenido dinámico
 */
export function updateAllWhatsAppLinks(): void {
  const links = document.querySelectorAll('a[href*="wa.me"]');
  
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Extraer mensaje actual
    const urlMatch = href.match(/text=([^&]*)/);
    if (!urlMatch) return;
    
    const currentMessage = decodeURIComponent(urlMatch[1]);
    
    // Solo actualizar si no tiene ya la URL
    if (!currentMessage.includes('URL:') && !currentMessage.includes('🔗')) {
      const baseMessage = currentMessage.split('\n')[0]; // Primer párrafo
      const newUrl = generateWhatsAppUrl(baseMessage, {
        includeUrl: true,
        includeTitle: true
      });
      
      link.setAttribute('href', newUrl);
    }
  });
}

// Auto-inicializar al cargar el DOM
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    updateAllWhatsAppLinks();
  });
}

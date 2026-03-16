# Skill: whatsapp-tracking-ga4

Sistema completo de tracking de WhatsApp con Google Analytics 4 y Google Tag Manager. Incluye botones reutilizables, mensajes enriquecidos con URL/página, y eventos de conversión automáticos.

## Qué hace

- ✅ **WhatsAppButton** - Botón con tracking completo (9 variantes)
- ✅ **WhatsAppFloat** - Botón flotante fijo con tracking
- ✅ **WhatsAppCTA** - Sección CTA completa con tracking
- ✅ **Mensajes enriquecidos** - Incluye automáticamente URL y título de página
- ✅ **Eventos GA4** - `whatsapp_click`, `generate_lead`, y eventos específicos
- ✅ **dataLayer** - Integración con Google Tag Manager
- ✅ **9 variantes** - hero, cta, float, service, blog, destination, card, footer, testimonial

## Instalación

```bash
node scripts/skill-add.js whatsapp-tracking-ga4
```

## Configuración

### 1. Actualizar Layout.astro

Agrega el script de inicialización en tu `Layout.astro`:

```astro
---
// Antes del cierre de </head>
---

<!-- Google Tag Manager - Data Layer Initialization -->
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  
  (function() {
    const path = window.location.pathname;
    let pageType = 'general';
    let destinationCountry = '';
    
    if (path === '/') pageType = 'home';
    else if (path.includes('/blog/')) pageType = 'blog';
    else if (path.includes('/servicios/')) pageType = 'service';
    // ... más detección según tu estructura
    
    window.gdTracking = { pageType, destinationCountry };
    
    dataLayer.push({
      event: 'pageview',
      page_type: pageType,
      destination_country: destinationCountry,
      page_location: window.location.href,
      page_title: document.title
    });
  })();
</script>

<!-- Google Analytics 4 - Reemplaza GA_MEASUREMENT_ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Configurar GA_MEASUREMENT_ID

Reemplaza `GA_MEASUREMENT_ID` con tu ID real de Google Analytics 4 (formato: `G-XXXXXXXXXX`).

### 3. Marcar eventos como conversión

En Google Analytics 4, ve a **Admin > Events** y marca como conversión:
- `generate_lead` - Evento de conversión principal
- `whatsapp_click` (opcional)

## Uso

### Botón Básico

```astro
---
import { WhatsAppButton } from '@skills/community/whatsapp-tracking-ga4';
---

<WhatsAppButton
  variant="hero"
  location="hero-home"
  message="Hola, quiero información para estudiar en el exterior"
>
  Agenda Tu Asesoría GRATIS
</WhatsAppButton>
```

### Botón Flotante

```astro
---
import { WhatsAppFloat } from '@skills/community/whatsapp-tracking-ga4';
---

<!-- Al final del Layout, antes de </body> -->
<WhatsAppFloat />
```

### Botón en Página de Destino

```astro
<WhatsAppButton
  variant="destination"
  location="hero-australia"
  message="Hola, quiero información para estudiar en Australia"
  destinationCountry="australia"
  pageType="destination"
  size="lg"
  style="secondary"
>
  Quiero Mi Asesoría GRATIS para Australia
</WhatsAppButton>
```

### CTA Final de Página

```astro
<WhatsAppButton
  variant="cta"
  location="cta-final"
  message="Hola, quiero solicitar mi asesoría gratuita"
  size="lg"
  style="outline"
>
  ¡Solicitar Mi Asesoría GRATIS Ahora!
</WhatsAppButton>
```

## Props WhatsAppButton

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `variant` | string | ✅ | - | Tipo: `hero`, `cta`, `float`, `service`, `blog`, `destination`, `card`, `footer`, `testimonial` |
| `location` | string | ✅ | - | Identificador único de ubicación |
| `message` | string | ✅ | - | Mensaje base del usuario |
| `destinationCountry` | string | ❌ | '' | País de destino |
| `pageType` | string | ❌ | auto | Tipo de página |
| `size` | 'sm' \| 'md' \| 'lg' | ❌ | 'md' | Tamaño del botón |
| `style` | 'primary' \| 'secondary' \| 'outline' | ❌ | 'primary' | Estilo visual |
| `className` | string | ❌ | '' | Clases CSS adicionales |
| `showIcon` | boolean | ❌ | true | Mostrar ícono WhatsApp |
| `iconPosition` | 'left' \| 'right' | ❌ | 'left' | Posición del ícono |

## Variantes

### `hero`
Botón principal en sección Hero de landing pages.

```astro
<WhatsAppButton variant="hero" location="hero-home" message="Hola...">
  Agenda Tu Asesoría
</WhatsAppButton>
```

### `cta`
Botón en secciones de llamado a la acción.

```astro
<WhatsAppButton variant="cta" location="cta-australia" message="Hola...">
  ¡Solicitar Ahora!
</WhatsAppButton>
```

### `float`
Botón flotante fijo en esquina inferior derecha.

```astro
<WhatsAppFloat />
```

### `destination`
Botón en páginas de destinos específicos.

```astro
<WhatsAppButton 
  variant="destination" 
  location="hero-canada"
  destinationCountry="canada"
  message="Hola..."
>
  Quiero ir a Canadá
</WhatsAppButton>
```

### `service`
Botón en páginas de servicios.

```astro
<WhatsAppButton variant="service" location="servicio-visas" message="Hola...">
  Consultar sobre Visas
</WhatsAppButton>
```

### `blog`
Botón en artículos de blog.

```astro
<WhatsAppButton variant="blog" location="blog-visa-australia" message="Hola...">
  Más información
</WhatsAppButton>
```

### `card`
Botón dentro de cards o componentes.

```astro
<WhatsAppButton variant="card" location="card-testimonial" message="Hola...">
  Dejar mi testimonio
</WhatsAppButton>
```

### `footer`
Botón en footer del sitio.

```astro
<WhatsAppButton variant="footer" location="footer-contacto" message="Hola...">
  Contactar
</WhatsAppButton>
```

### `testimonial`
Botón en sección de testimonios.

```astro
<WhatsAppButton variant="testimonial" location="testimonial-cta" message="Hola...">
  Compartir mi experiencia
</WhatsAppButton>
```

## Eventos GA4

### Evento Principal: `whatsapp_click`

Se dispara en todos los clicks con estos parámetros:

```javascript
{
  button_variant: 'hero',           // Variante del botón
  button_location: 'hero-home',     // Ubicación específica
  page_url: 'https://...',          // URL completa
  page_title: 'Título',             // Título de página
  page_type: 'home',                // Tipo de página
  destination_country: 'australia', // País de destino
  section: 'hero-home',             // Sección
  transport_type: 'beacon'          // Transporte GA4
}
```

### Eventos Específicos

Cada variante dispara un evento específico:
- `whatsapp_hero_click`
- `whatsapp_cta_click`
- `whatsapp_float_click`
- `whatsapp_destination_click`
- `whatsapp_service_click`
- `whatsapp_blog_click`
- `whatsapp_card_click`
- `whatsapp_footer_click`
- `whatsapp_testimonial_click`

### Evento de Conversión: `generate_lead`

```javascript
{
  value: 1.0,
  currency: 'USD',
  lead_source: 'whatsapp',
  lead_medium: 'hero',  // Variante del botón
  page_location: 'https://...'
}
```

## Mensajes de WhatsApp

### Formato Automático

Los mensajes de WhatsApp incluyen automáticamente:

```
Hola, quiero información para estudiar en Australia

📄 Página: Estudiar en Australia 2026 | Global Dreamers
🔗 URL: https://globaldreamers.com.au/estudiar-en-australia/

(Vía: destination)
```

### Configurar Mensaje Base

```astro
<WhatsAppButton
  variant="hero"
  location="hero-home"
  message="Hola, vi su página y quiero más información"
>
  Contactar
</WhatsAppButton>
```

## Utilidades JavaScript

### Generar URL de WhatsApp manualmente

```typescript
import { generateWhatsAppUrl } from '@skills/community/whatsapp-tracking-ga4';

const url = generateWhatsAppUrl(
  'Hola, quiero información',
  { includeUrl: true, includeTitle: true }
);
// Result: https://wa.me/61449159849?text=Hola%2C%20quiero...
```

### Tracking manual

```typescript
import { trackWhatsAppClickGA4 } from '@skills/community/whatsapp-tracking-ga4';

trackWhatsAppClickGA4({
  variant: 'custom',
  location: 'custom-location',
  pageType: 'custom',
  destinationCountry: 'australia'
});
```

## dataLayer

La skill automáticamente hace push a dataLayer para Google Tag Manager:

```javascript
dataLayer.push({
  event: 'whatsapp_click',
  button_variant: 'hero',
  button_location: 'hero-home',
  // ... otros parámetros
  event_timestamp: '2026-03-16T10:30:00.000Z'
});
```

## Reportes en GA4

### 1. Rendimiento por Variante
Exploración > Exploración libre
- Filas: `button_variant`
- Métricas: `whatsapp_click`, `generate_lead`

### 2. Rendimiento por Destino
- Filas: `destination_country`
- Filtro: Excluir `(not set)`

### 3. Embudo de Conversión
- Paso 1: `page_view`
- Paso 2: `whatsapp_click`
- Paso 3: `generate_lead`

## Debugging

Los eventos se loguean en consola para debugging:

```
[GD Tracking] Initialized: {pageType: "destination", destinationCountry: "australia"}
[WhatsApp Button] Click: {variant: "hero", location: "hero-australia", ...}
[WhatsApp Tracking] GA4 Events: {main: {...}, specific: {...}, conversion: {...}}
```

## Personalización

### Cambiar número de WhatsApp

Edita `components/WhatsAppButton.astro` y `components/WhatsAppFloat.astro`:

```typescript
const WHATSAPP_NUMBER = 'TUNUMERO'; // Reemplaza 61449159849
```

### Personalizar estilos

Usa la prop `className`:

```astro
<WhatsAppButton 
  variant="hero" 
  location="custom"
  message="Hola..."
  className="bg-blue-600 hover:bg-blue-700 rounded-lg"
>
  Contactar
</WhatsAppButton>
```

## Troubleshooting

### Los eventos no aparecen en GA4
1. Verificar que `GA_MEASUREMENT_ID` está configurado
2. Verificar que gtag está cargado en consola: `typeof gtag`
3. Verificar en GA4 Realtime que los eventos llegan
4. Revisar console logs para errores

### dataLayer no definido
Asegúrate de que el script de inicialización esté en el Layout antes de usar los componentes.

### URL de WhatsApp no incluye página
Verificar que el botón tenga el script de tracking correctamente cargado.

## Dependencias

- Google Analytics 4 (gtag.js)
- Google Tag Manager (opcional, para dataLayer)
- Tailwind CSS (para estilos)

## Compatibilidad

- ✅ Astro 5.x
- ✅ React (con adaptación)
- ✅ Vue (con adaptación)
- ✅ Google Analytics 4
- ✅ Google Tag Manager

## Metadata

- **Categoría**: community
- **Creada**: 2026-03-16
- **Versión**: 1.0.0
- **Autor**: Global Dreamers
- **Reutilizable**: Sí
- **Dependencias**: seo-ai-citations (comparte Layout)

## Changelog

### v1.0.0 (2026-03-16)
- Versión inicial
- 9 variantes de botones
- Tracking GA4 completo
- Integración dataLayer
- Mensajes enriquecidos automáticos

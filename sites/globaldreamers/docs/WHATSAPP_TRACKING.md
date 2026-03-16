# 📊 Sistema de Tracking WhatsApp + Google Analytics 4

Documentación completa del sistema de tracking para botones de WhatsApp en Global Dreamers.

## 🎯 Estructura de Eventos

### Evento Principal: `whatsapp_click`

Este evento se dispara en **todos** los clicks de botones WhatsApp y contiene los siguientes parámetros:

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `button_variant` | string | Tipo de botón | `hero`, `cta`, `float`, `service`, `blog`, `destination` |
| `button_location` | string | Ubicación específica | `hero-home`, `cta-australia`, `footer` |
| `page_url` | string | URL completa de la página | `https://globaldreamers.com.au/estudiar-en-australia/` |
| `page_title` | string | Título de la página | `Estudiar en Australia 2026` |
| `page_type` | string | Tipo de página | `home`, `destination`, `blog`, `service` |
| `destination_country` | string | País de destino (si aplica) | `australia`, `canada`, `general` |
| `user_intent` | string | Intención del mensaje | `general_inquiry` |
| `section` | string | Sección de la página | `hero`, `footer`, `testimonials` |
| `transport_type` | string | Método de transporte GA4 | `beacon` |

### Eventos Específicos por Variante

Cada tipo de botón también dispara un evento específico:

| Evento | Descripción | Cuándo se dispara |
|--------|-------------|-------------------|
| `whatsapp_hero_click` | Botón en Hero section | Landing pages principales |
| `whatsapp_cta_click` | Botón en secciones CTA | Llamados a la acción |
| `whatsapp_float_click` | Botón flotante | Siempre visible en esquina |
| `whatsapp_service_click` | Botón en páginas de servicios | /servicios/* |
| `whatsapp_blog_click` | Botón en artículos de blog | /blog/* |
| `whatsapp_destination_click` | Botón en páginas de destinos | /estudiar-en-*/ |
| `whatsapp_card_click` | Botón en cards o componentes | Testimonios, features |
| `whatsapp_footer_click` | Botón en footer | Footer global |

### Eventos de Conversión

| Evento | Descripción | Valor |
|--------|-------------|-------|
| `generate_lead` | Conversión principal GA4 | $1.00 USD |

El evento `generate_lead` incluye:
- `value`: 1.0
- `currency`: "USD"
- `lead_source`: "whatsapp"
- `lead_medium`: Variante del botón (hero, cta, float, etc.)
- `page_location`: URL de la página

## 📱 Mensajes de WhatsApp

### Formato del Mensaje

Todos los mensajes de WhatsApp incluyen automáticamente:

```
{Mensaje base del usuario}

📄 Página: {Título de la página}
🔗 URL: {URL limpia}

(Vía: {variante})
```

### Ejemplo Real

```
Hola, quiero información para estudiar en Australia

📄 Página: Estudiar en Australia 2026 | Global Dreamers
🔗 URL: https://globaldreamers.com.au/estudiar-en-australia/

(Vía: destination)
```

## 🏷️ Taxonomía de Variantes

### `hero`
- **Uso**: Botón principal en sección Hero
- **Ubicaciones**: Home, páginas de destino
- **Ejemplo**: `location="hero-home"`, `location="hero-australia"`

### `cta`
- **Uso**: Botones en secciones de llamado a la acción
- **Ubicaciones**: Final de páginas, entre secciones
- **Ejemplo**: `location="cta-final-australia"`

### `float`
- **Uso**: Botón flotante siempre visible
- **Ubicación**: Esquina inferior derecha
- **ID**: `#whatsapp-float`

### `destination`
- **Uso**: Páginas de destinos específicos
- **Ejemplo**: `/estudiar-en-australia/`
- **Incluye**: `destinationCountry` en tracking

### `service`
- **Uso**: Páginas de servicios
- **Ejemplo**: `/servicios/acompanamiento/`

### `blog`
- **Uso**: Artículos del blog
- **Ejemplo**: `/blog/visa-estudiante-australia/`

### `testimonial`
- **Uso**: Sección de testimonios
- **Ejemplo**: `location="testimonial-section"`

### `card`
- **Uso**: Cards individuales (features, servicios)
- **Ejemplo**: `location="card-planner"`

### `footer`
- **Uso**: Footer global del sitio
- **Ubicación**: Enlaces en footer

## 🔧 Implementación

### Componente Recomendado: WhatsAppButton

```astro
import WhatsAppButton from '../components/WhatsAppButton.astro';

<WhatsAppButton
  variant="hero"
  location="hero-australia"
  message="Hola, quiero información para estudiar en Australia"
  destinationCountry="australia"
  pageType="destination"
  size="lg"
  style="secondary"
>
  Agenda Tu Asesoría GRATIS
</WhatsAppButton>
```

### Props del Componente

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `variant` | string | ✅ | Tipo de botón |
| `location` | string | ✅ | Identificador único |
| `message` | string | ✅ | Mensaje base WhatsApp |
| `destinationCountry` | string | ❌ | País de destino |
| `pageType` | string | ❌ | Tipo de página |
| `size` | 'sm' \| 'md' \| 'lg' | ❌ | Tamaño (default: md) |
| `style` | 'primary' \| 'secondary' \| 'outline' | ❌ | Estilo visual |
| `className` | string | ❌ | Clases CSS extras |
| `showIcon` | boolean | ❌ | Mostrar ícono (default: true) |
| `iconPosition` | 'left' \| 'right' | ❌ | Posición ícono |

### Implementación Manual (para casos especiales)

```html
<a 
  href="#"
  class="whatsapp-track"
  data-variant="custom"
  data-location="custom-location"
  data-message="Hola, mensaje personalizado"
>
  Contactar
</a>

<script>
  document.querySelectorAll('.whatsapp-track').forEach(btn => {
    btn.addEventListener('click', () => {
      // Tracking automático vía dataLayer
      dataLayer.push({
        event: 'whatsapp_click',
        button_variant: btn.dataset.variant,
        button_location: btn.dataset.location,
        // ... otros parámetros
      });
    });
  });
</script>
```

## 📊 dataLayer

### Estructura de dataLayer

El dataLayer se inicializa automáticamente en el Layout:

```javascript
window.dataLayer = window.dataLayer || [];

// Push de página vista
dataLayer.push({
  event: 'pageview',
  page_type: 'destination',
  destination_country: 'australia',
  page_location: 'https://globaldreamers.com.au/estudiar-en-australia/',
  page_title: 'Estudiar en Australia 2026',
  page_path: '/estudiar-en-australia/',
  timestamp: '2026-03-16T10:30:00.000Z'
});
```

### Evento de Click en dataLayer

```javascript
dataLayer.push({
  event: 'whatsapp_click',
  button_variant: 'hero',
  button_location: 'hero-australia',
  page_url: 'https://globaldreamers.com.au/estudiar-en-australia/',
  page_title: 'Estudiar en Australia 2026',
  page_type: 'destination',
  destination_country: 'australia',
  section: 'hero-australia',
  event_timestamp: '2026-03-16T10:35:00.000Z'
});
```

## 🔍 Google Analytics 4 - Configuración

### Eventos Recomendados a Marcar como Conversión

En GA4, marca estos eventos como conversiones:

1. `generate_lead` - Evento de conversión principal
2. `whatsapp_click` - Seguimiento de engagement

### Dimensiones Personalizadas (Opcional)

Crea estas dimensiones personalizadas en GA4:

| Nombre | Alcance | Parámetro de evento |
|--------|---------|---------------------|
| Button Variant | Evento | `button_variant` |
| Destination Country | Evento | `destination_country` |
| Page Type | Evento | `page_type` |
| Button Location | Evento | `button_location` |

### Métricas Personalizadas (Opcional)

| Nombre | Alcance | Parámetro de evento |
|--------|---------|---------------------|
| Lead Value | Evento | `value` |

## 📈 Reportes Sugeridos en GA4

### 1. Rendimiento por Variante

Exploración > Exploración libre
- Filas: `button_variant`
- Métricas: Eventos `whatsapp_click`, `generate_lead`

### 2. Rendimiento por Destino

Exploración > Exploración libre
- Filas: `destination_country`
- Métricas: Eventos `whatsapp_click`, `generate_lead`
- Filtro: `destination_country` != "general"

### 3. Embudo de Conversión

Exploración > Embudo
- Paso 1: `page_view` (página de destino)
- Paso 2: `whatsapp_click` (click WhatsApp)
- Paso 3: `generate_lead` (conversión)

### 4. Páginas con Más Clicks

Exploración > Exploración libre
- Filas: `page_title`
- Métricas: Eventos `whatsapp_click`

## 🧪 Testing y Debugging

### Console Logs

El sistema imprime logs en consola para debugging:

```
[GD Tracking] Initialized: {pageType: "destination", destinationCountry: "australia"}
[WhatsApp Button] Click: {variant: "hero", location: "hero-australia", destinationCountry: "australia"}
[WhatsApp Tracking] GA4 Events: {main: {...}, specific: {...}, conversion: {...}}
```

### Verificación con Tag Assistant

1. Instala Google Tag Assistant (Chrome extension)
2. Navega a tu sitio
3. Haz click en cualquier botón WhatsApp
4. Verifica que se disparen los eventos:
   - `whatsapp_click`
   - `whatsapp_{variant}_click`
   - `generate_lead`

### Verificación con GA4 Realtime

1. Ve a GA4 > Reports > Realtime
2. Haz click en un botón WhatsApp
3. Verifica que aparezca el evento en tiempo real

## 🚀 Despliegue

### Paso 1: Actualizar GA_MEASUREMENT_ID

En `Layout.astro`, reemplaza `GA_MEASUREMENT_ID` con tu ID real:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  gtag('config', 'G-XXXXXXXXXX', {...});
</script>
```

### Paso 2: Verificar dataLayer

Abre DevTools > Console y ejecuta:

```javascript
console.log(dataLayer);
```

Deberías ver el array con los eventos `pageview` y `whatsapp_click`.

### Paso 3: Test en Producción

Realiza clicks en diferentes tipos de botones y verifica en GA4 Realtime que los eventos lleguen correctamente.

## 📝 Changelog

### v1.0 (2026-03-16)
- Implementación inicial del sistema de tracking
- Componente `WhatsAppButton` creado
- Eventos GA4 configurados: `whatsapp_click`, `generate_lead`
- dataLayer inicializado con detección automática de página
- Tracking automático de URL y título en mensajes WhatsApp

## 📞 Soporte

Para dudas o problemas con el tracking:
1. Verificar logs en consola del navegador
2. Confirmar que `dataLayer` está definido
3. Verificar que `gtag` está cargado (GA4)
4. Revisar que los botones tienen los `data-*` attributes correctos

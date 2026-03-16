# 📋 Plan: Crear Skill "whatsapp-tracking-ga4" para Kinto CMS

## 🎯 Objetivo

Convertir el sistema de tracking de WhatsApp + Google Analytics 4 implementado en Global Dreamers en una skill reutilizable de Kinto CMS.

## 📁 Estructura de la Skill

```
skills/community/whatsapp-tracking-ga4/
├── SKILL.md                          # Documentación principal
├── index.ts                          # Entry point para exports
├── components/
│   ├── WhatsAppButton.astro          # Botón con tracking
│   ├── WhatsAppFloat.astro           # Botón flotante
│   └── WhatsAppCTA.astro             # CTA section con tracking
├── utils/
│   └── whatsappTracking.ts           # Librería de tracking
├── hooks/
│   └── useWhatsAppTracking.ts        # Hook para frameworks
└── install/
    └── layout.patch                  # Patch para Layout.astro
```

## 🔧 Componentes a Incluir

### 1. WhatsAppButton.astro
- Props: variant, location, message, destinationCountry, pageType, size, style
- Tracking automático GA4 + dataLayer
- 9 variantes: hero, cta, float, service, blog, destination, card, footer, testimonial

### 2. WhatsAppFloat.astro
- Botón flotante fijo
- Tracking mejorado
- Animaciones y estilos

### 3. WhatsAppCTA.astro
- Sección completa de CTA con tracking
- Variant: cta-section

### 4. whatsappTracking.ts
- generateWhatsAppMessage()
- generateWhatsAppUrl()
- trackWhatsAppClickGA4()
- initWhatsAppTracking()
- updateAllWhatsAppLinks()

## 📦 Archivos a Crear

### SKILL.md
- Descripción de la skill
- Instalación
- Uso de componentes
- Configuración de GA4
- Eventos trackeados
- Ejemplos

### index.ts
```typescript
export { default as WhatsAppButton } from './components/WhatsAppButton.astro';
export { default as WhatsAppFloat } from './components/WhatsAppFloat.astro';
export { default as WhatsAppCTA } from './components/WhatsAppCTA.astro';
export * from './utils/whatsappTracking';
```

### install/layout.patch
- Script de dataLayer initialization
- Script de GA4 gtag
- Atributos data-* en body

## 🚀 Proceso de Creación

### Paso 1: Crear estructura de directorios
```bash
mkdir -p skills/community/whatsapp-tracking-ga4/{components,utils,hooks,install}
```

### Paso 2: Copiar componentes adaptados
- Copiar WhatsAppButton.astro (modificar imports)
- Copiar WhatsAppFloat.astro (modificar imports)
- Copiar whatsappTracking.ts (sin cambios)

### Paso 3: Crear SKILL.md
Documentación completa con:
- Qué hace
- Instalación
- Uso de cada componente
- Configuración de GA4
- Eventos disponibles
- Props de cada componente
- Ejemplos

### Paso 4: Crear index.ts
Exportar todos los componentes y utilidades

### Paso 5: Crear install/layout.patch
Script para agregar al Layout.astro

### Paso 6: Crear WhatsAppCTA.astro
Componente de sección CTA completa

### Paso 7: Testing
- Instalar skill en sitio de prueba
- Verificar que funciona correctamente
- Verificar tracking en GA4

### Paso 8: Documentación adicional
- Guía de migración
- Troubleshooting
- FAQ

## 📊 Eventos GA4 Implementados

| Evento | Descripción |
|--------|-------------|
| `whatsapp_click` | Evento principal |
| `whatsapp_hero_click` | Hero buttons |
| `whatsapp_cta_click` | CTA buttons |
| `whatsapp_float_click` | Float button |
| `whatsapp_service_click` | Service pages |
| `whatsapp_blog_click` | Blog articles |
| `whatsapp_destination_click` | Destination pages |
| `whatsapp_card_click` | Card components |
| `whatsapp_footer_click` | Footer links |
| `whatsapp_testimonial_click` | Testimonial CTA |
| `generate_lead` | Conversion event |

## 🔑 Parámetros de Tracking

```typescript
interface WhatsAppTrackingParams {
  variant: 'hero' | 'cta' | 'float' | 'service' | 'blog' | 'destination' | 'card' | 'footer' | 'testimonial';
  location: string;
  pageUrl?: string;
  pageTitle?: string;
  pageType?: string;
  destinationCountry?: string;
  userIntent?: string;
  section?: string;
}
```

## 📝 Mensajes WhatsApp

Formato automático:
```
{Mensaje base}

📄 Página: {pageTitle}
🔗 URL: {pageUrl}

(Vía: {variant})
```

## ⚙️ Configuración

### Variables requeridas
- `GA_MEASUREMENT_ID`: ID de Google Analytics 4
- `WHATSAPP_NUMBER`: Número de WhatsApp (default: 61449159849)

### Configuración GA4
1. Marcar `generate_lead` como conversión
2. Opcional: Dimensiones personalizadas

## 🎨 Variantes de Botón

### Hero
```astro
<WhatsAppButton
  variant="hero"
  location="hero-home"
  message="Hola, quiero información"
  size="lg"
  style="secondary"
>
  Agenda Tu Asesoría
</WhatsAppButton>
```

### CTA
```astro
<WhatsAppButton
  variant="cta"
  location="cta-australia"
  message="Hola, quiero asesoría"
  destinationCountry="australia"
  style="outline"
>
  ¡Solicitar Ahora!
</WhatsAppButton>
```

### Float
```astro
<WhatsAppFloat />
```

## 📚 Documentación a Incluir

1. **SKILL.md**: Documentación completa
2. **README.md**: Quick start guide
3. **CHANGELOG.md**: Historial de cambios
4. **EXAMPLES.md**: Ejemplos de uso
5. **MIGRATION.md**: Guía de migración desde implementación manual

## ✅ Checklist de Completitud

- [ ] Estructura de directorios creada
- [ ] SKILL.md completo
- [ ] index.ts con exports
- [ ] WhatsAppButton.astro adaptado
- [ ] WhatsAppFloat.astro adaptado
- [ ] WhatsAppCTA.astro creado
- [ ] whatsappTracking.ts copiado
- [ ] install/layout.patch creado
- [ ] Testing completado
- [ ] Documentación revisada

## 🎯 Uso Final

```bash
# Instalar skill
node scripts/skill-add.js whatsapp-tracking-ga4

# Usar en componentes
import { WhatsAppButton, WhatsAppFloat } from '@skills/community/whatsapp-tracking-ga4';
```

## 🔗 Integración con Otras Skills

- Compatible con `seo-ai-citations` (comparte Layout)
- Compatible con `testimonials` (tracking en CTA de testimonios)
- Compatible con `blog` (tracking en artículos)

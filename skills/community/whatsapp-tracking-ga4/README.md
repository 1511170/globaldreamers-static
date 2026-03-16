# WhatsApp Tracking GA4

Sistema completo de tracking de WhatsApp con Google Analytics 4 para Kinto CMS.

## Instalación Rápida

```bash
node scripts/skill-add.js whatsapp-tracking-ga4
```

## Setup

1. **Configurar GA4**: Reemplaza `GA_MEASUREMENT_ID` en tu `Layout.astro`
2. **Agregar componentes**: Usa `WhatsAppButton` o `WhatsAppFloat`
3. **Verificar tracking**: Revisa GA4 Realtime para confirmar eventos

## Ejemplo Básico

```astro
---
import { WhatsAppButton, WhatsAppFloat } from '@skills/community/whatsapp-tracking-ga4';
---

<WhatsAppButton
  variant="hero"
  location="hero-home"
  message="Hola, quiero información"
>
  Contactar por WhatsApp
</WhatsAppButton>

<WhatsAppFloat />
```

## Features

- ✅ 9 variantes de botones (hero, cta, float, destination, etc.)
- ✅ Mensajes automáticos con URL y título de página
- ✅ Eventos GA4: `whatsapp_click`, `generate_lead`
- ✅ Integración dataLayer para GTM
- ✅ Tracking de conversión

## Documentación

Ver `SKILL.md` para documentación completa.

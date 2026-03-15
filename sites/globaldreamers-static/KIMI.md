# KIMI.md - Contexto Técnico para IA

> **Para:** Kimi Code, Claude Code, Cursor, o cualquier IA agente  
> **Proyecto:** Global Dreamers - Agencia de estudios internacionales  
> **Stack:** Astro 5 + Tailwind CSS + Material Symbols  
> **Última actualización:** 2026-03-15

---

## 🚀 Comandos Esenciales

```bash
# Estás en: sites/globaldreamers/

# Dev server
npm run dev

# Build (debe generar 31 páginas)
npm run build

# Verificar build
ls dist/ | wc -l

# Skills del proyecto
cat skills-active.json
```

---

## 📁 Estructura de Páginas

### Páginas Principales
```
src/pages/
├── index.astro                    # Home completo
├── servicios/
│   ├── index.astro               # Landing servicios
│   ├── gestion-de-visas/         # ✅ SEO completo
│   ├── seleccion-de-cursos/      # ✅ SEO completo
│   ├── alojamiento/              # ✅ SEO completo
│   ├── acompanamiento/           # ✅ SEO completo
│   └── seguro-medico/            # ✅ SEO completo
├── asesoria-gratuita.astro        # ✅ SEO completo
├── nosotros.astro                 # ⚠️ Básica
├── blog.astro                     # ⚠️ No creada
├── estudiar-en-[country].astro    # 11 destinos dinámicos
└── estudiar-en-*/
    └── planner.astro             # 11 journey builders
```

### Layouts y Componentes
```
src/
├── layouts/
│   └── Layout.astro              # SEOHead + SchemaOrg incluidos
├── components/
│   ├── Navbar.astro              # Dropdown de servicios actualizado
│   ├── Footer.astro              # Footer estándar
│   ├── SEOHead.astro             # Meta tags dinámicos
│   ├── SchemaOrg.astro           # Structured data
│   └── WhatsAppFloat.astro       # Botón flotante
└── data/
    └── destinations.ts           # Datos de 11 destinos
```

---

## 🎨 Sistema de Diseño

### Colores (Tailwind)
```css
/* Primary - Cyan/Azul celeste */
primary: #41c5f3
bg-primary / text-primary / border-primary

/* Neutros */
slate-50   #f8fafc   /* Backgrounds */
slate-100  #f1f5f9   /* Cards hover */
slate-200  #e2e8f0   /* Borders */
slate-600  #475569   /* Body text */
slate-900  #0f172a   /* Headings */

/* Dark sections */
bg-slate-900   /* Stats bar, CTAs */
```

### Tipografía
- **Display/Headings:** Inter (font-display)
- **Icons:** Material Symbols Outlined

### Layout Estándar
```astro
<!-- Container -->
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

<!-- Section padding -->
<section class="py-20 lg:py-24">

<!-- Card -->
<div class="bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary/50 transition-all">

<!-- Stats bar -->
<section class="bg-slate-900 py-12">
  <div class="text-3xl font-bold text-primary">
```

### Iconos (Material Symbols)
```astro
<span class="material-symbols-outlined">icon_name</span>

<!-- Iconos comunes usados -->
support_agent    <!-- Asesoría -->
description      <!-- Visas -->
school           <!-- Cursos -->
apartment        <!-- Alojamiento -->
flight_takeoff   <!-- Acompañamiento -->
health_and_safety <!-- Seguro -->
verified         <!-- Trust badges -->
arrow_forward    <!-- CTAs -->
expand_more      <!-- Dropdowns -->
```

---

## 🔧 Patrón de Página de Servicio

### Frontmatter Template
```astro
---
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/Navbar.astro';
import Footer from '../../components/Footer.astro';

const title = 'Nombre Servicio | Global Dreamers';
const description = '✅ Descripción SEO-friendly con keywords';
const keywords = ['keyword1', 'keyword2', 'keyword3'];

const faqs = [
  { q: 'Pregunta?', a: 'Respuesta detallada.' },
];

const breadcrumbs = [
  { name: 'Inicio', url: '/' },
  { name: 'Servicios', url: '/servicios/' },
  { name: 'Nombre Servicio', url: '/servicios/servicio/' },
];
---
```

### Layout Props
```astro
<Layout 
  title={title}
  description={description}
  keywords={keywords}
  canonical="/servicios/nombre-servicio/"
  schemaType={['Organization', 'Service', 'BreadcrumbList', 'FAQPage']}
  schemaData={{
    name: 'Nombre Servicio Global Dreamers',
    description: '...',
    serviceType: 'EducationalService',
    provider: { '@type': 'Organization', name: 'Global Dreamers' },
    aggregateRating: { ratingValue: '4.9', reviewCount: '500' }
  }}
  breadcrumbs={breadcrumbs}
  faqs={faqs}
>
```

---

## 📞 WhatsApp Integration

**Número:** +61 449 159 849

**CTA Pattern:**
```astro
<a 
  href="https://wa.me/61449159849?text=MENSAJE_URLENCODED"
  target="_blank"
  rel="noopener noreferrer"
  class="inline-flex items-center gap-2 bg-primary text-slate-900 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
>
  <span class="material-symbols-outlined">chat</span>
  Texto del Botón
</a>
```

**Mensajes predefinidos:**
| Servicio | Mensaje |
|----------|---------|
| Visa | `Hola%2C%20quiero%20iniciar%20mi%20tr%C3%A1mite%20de%20visa` |
| Asesoría | `Hola%2C%20quiero%20agendar%20mi%20asesor%C3%ADa%20gratuita` |
| Cursos | `Hola%2C%20quiero%20encontrar%20mi%20curso%20ideal` |
| Alojamiento | `Hola%2C%20necesito%20ayuda%20con%20alojamiento` |

---

## 🌍 Destinos Soportados

| País | URL | Código Bandera |
|------|-----|----------------|
| Australia | `/estudiar-en-australia/` | au |
| Canadá | `/estudiar-en-canada/` | ca |
| Reino Unido | `/estudiar-en-reino-unido/` | gb |
| Irlanda | `/estudiar-en-irlanda/` | ie |
| Nueva Zelanda | `/estudiar-en-nueva-zelanda/` | nz |
| Malta | `/estudiar-en-malta/` | mt |
| Alemania | `/estudiar-en-alemania/` | de |
| Italia | `/estudiar-en-italia/` | it |
| España | `/estudiar-en-espana/` | es |
| Estados Unidos | `/estudiar-en-estados-unidos/` | us |
| Dubai | `/estudiar-en-dubai/` | ae |

**Banderas CDN:**
```html
<img src="https://kapowaz.github.io/circle-flags/flags/xx.svg" />
```

---

## 🔍 SEO Checklist

### Por cada nueva página:
- [ ] Title único (< 60 chars)
- [ ] Meta description (< 160 chars)
- [ ] Keywords relevantes
- [ ] Canonical URL
- [ ] Schema.org (Service + BreadcrumbList + FAQPage)
- [ ] FAQs mínimo 4 preguntas
- [ ] H1 único por página
- [ ] Alt text en imágenes
- [ ] WhatsApp CTAs

### Navbar updates:
- [ ] Agregar a `servicesNavItems` si es servicio
- [ ] Actualizar `href` si cambia URL
- [ ] Icono de Material Symbols

---

## 🐛 Troubleshooting

### Build falla
```bash
# Limpiar caché
rm -rf dist/ node_modules/.astro/
npm run build
```

### 404 en páginas de servicio
Verificar que:
1. Archivo existe en `src/pages/servicios/nombre/`
2. Navbar apunta a URL correcta
3. Build generó `dist/servicios/nombre/index.html`

### CSS no aplica
- Verificar que las clases usen el color `primary` (no brand-600)
- Material Symbols debe estar cargado en Layout

---

## 📚 Referencias Rápidas

- **MEMORY.md** - Historial completo de cambios
- **KINTO.md** - Guía del cliente (brief original)
- **CLAUDE.md** - Contexto del proyecto (raíz)

---

## ✅ Workflow Recomendado

1. **Crear/editar página** en `src/pages/`
2. **Actualizar navbar** si es necesario
3. **Test local:** `npm run dev`
4. **Build:** `npm run build` (verificar 31 páginas)
5. **Commit:** `git add -A && git commit -m "..."`
6. **Push main:** `git push origin main`
7. **Sync static:** `robocopy dist ..\globaldreamers-static\ /MIR`
8. **Commit static:** `cd ..\globaldreamers-static && git add -A && git commit`
9. **Push static:** `git push origin master`

---

**Contacto IA:** Si tienes dudas, revisa MEMORY.md primero, luego este archivo.

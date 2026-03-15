# CLAUDE.md — Contexto Completo del Proyecto KINTO CMS / Global Dreamers

## Qué es este repositorio

**KINTO CMS** — Generador de sitios estáticos empresariales con arquitectura de skills/plugins bajo demanda.

- **Raíz:** `C:\Users\camilo\DEVS\globaldreamers`
- **Stack:** Astro 5 (SSG) + Tailwind CSS 4 + Sveltia CMS
- **Deploy:** Cloudflare Pages (pendiente)
- **CLI:** `kinto.js` (en la raíz)

---

## Arquitectura del sistema

```
globaldreamers/           ← raíz del repo
├── core/                 # Motor mínimo Astro + Tailwind (NO tocar)
├── skills/
│   ├── official/         # cms-sveltia, kinto-cms
│   └── community/        # blog, contact-form, forms-web3forms, testimonials,
│                         # cloudflare-pages, cloudflare-tunnel, web-scraper,
│                         # browser-automation, image-optimizer, seo-ai-citations,
│                         # webflow-effects, webflow-migration, i18n
├── sites/
│   └── globaldreamers/   # ← Sitio activo del cliente
├── templates/
│   └── enterprise/       # Template base para nuevos sitios
└── docs/                 # AI_GENERATION.md, TAREAS_MEJORA_TECNICAS.md, etc.
```

---

## Sitio activo: Global Dreamers (`sites/globaldreamers/`)

**Cliente:** Global Dreamers — Agencia de estudios internacionales para latinoamericanos.
**Dominio:** globaldreamers.com.au (registrado)
**CMS (oculto):** glo.kinto.info/admin (no enlazado públicamente)
**Repo GitHub:** https://github.com/1511170/globaldreamers.git

### Stack del sitio
- Astro 5 (SSG, output: static)
- Tailwind CSS 4
- Fuentes: Inter + Material Symbols via Google Fonts
- Color brand: `brand-600` (definido en global.css como variable Tailwind)
- Animaciones: GSAP + ScrollTrigger

### Estructura del sitio
```
sites/globaldreamers/
├── config/
│   └── site.config.ts         # Dominio, CMS config, build settings
├── src/
│   ├── layouts/
│   │   ├── Layout.astro       # Layout base con SEO completo
│   │   └── MarkdownLayout.astro # Layout para posts de blog
│   ├── pages/
│   │   ├── index.astro                    # Home completo
│   │   ├── blog/
│   │   │   ├── index.astro               # Listado de blog con filtros avanzados
│   │   │   └── [...slug].astro           # Posts individuales dinámicos
│   │   ├── estudiar-en-australia.astro   # Página estática de Australia
│   │   ├── estudiar-en-[country].astro   # Ruta dinámica para todos los destinos
│   │   ├── nosotros.astro                # Página Nosotros
│   │   ├── servicios.astro               # Página de servicios
│   │   ├── servicios/                    # Páginas individuales de servicios
│   │   ├── asesoria-gratuita.astro       # Landing de captación
│   │   └── estudiar-en-[country]/        # Páginas de planners por país
│   ├── components/
│   │   ├── Navbar.astro        # Header fijo con dropdown de destinos y servicios
│   │   ├── Footer.astro        # Footer completo con certificaciones
│   │   ├── WhatsAppFloat.astro # Botón flotante de WhatsApp
│   │   ├── Hero.astro          # Hero principal del home
│   │   ├── Partners.astro      # Logos de partners
│   │   ├── WhyUs.astro         # Razones para elegir GD
│   │   ├── HowItWorks.astro    # Proceso paso a paso
│   │   ├── Destinations.astro  # Grid de destinos disponibles
│   │   ├── CTABanner.astro     # Banda de CTA final
│   │   ├── SEOHead.astro       # Componente SEO completo
│   │   └── SchemaOrg.astro     # Schema.org structured data
│   ├── data/
│   │   └── destinations.ts     # Datos de todos los destinos (data-driven)
│   ├── content/
│   │   └── blog/               # 81 artículos en Markdown
│   ├── styles/
│   │   └── global.css          # Estilos globales + variables de marca
│   └── content.config.ts       # Configuración de colecciones de contenido
├── public/
│   ├── images/
│   │   ├── blog/               # 311 imágenes WebP optimizadas
│   │   ├── destinations/       # Imágenes de destinos
│   │   └── logos/              # Logos de partners y certificaciones
│   └── robots.txt
└── skills-active.json          # Skills instaladas
```

### Config del sitio (`config/site.config.ts`)
```typescript
{
  site: {
    domain: 'globaldreamers.com.au',
    name: 'Global Dreamers',
    description: 'Agencia de estudios internacionales...',
    language: 'es',
    logo: '/images/logo-globaldreamers-color.png',
    favicon: '/favicon.ico'
  },
  cms: {
    enabled: true,
    subdomain: 'glo.kinto.info',
    hidden: true,
    githubRepo: '1511170/globaldreamers',
    authEndpoint: 'https://glo-auth.kinto.workers.dev'
  },
  build: { output: 'static', compressHTML: true, inlineStylesheets: 'auto' }
}
```

---

## Lo que se ha construido (trabajo completado)

### Layout base (`src/layouts/Layout.astro`)
- SEO completo: title, description, canonical, robots
- Open Graph (og:type, og:title, og:description, og:url, og:image, og:locale)
- Twitter Cards (summary_large_image)
- AI Citations: `<link rel="alternate" type="text/plain" href="/llms.txt" />`
- Google Fonts: Inter + Material Symbols
- GSAP + ScrollTrigger CDN
- Slot `name="head"` para que skills inyecten schemas/scripts

### Home (`src/pages/index.astro`)
Componentes en orden: Navbar → Hero → Partners → WhyUs → HowItWorks → Destinations → CTABanner → Footer

### Navbar (`src/components/Navbar.astro`)
- Header fijo (`sticky top-0`), backdrop-blur, shadow
- Logo GlobalDreamers
- Desktop: Links + dropdown "Destinos" con grid 2 columnas (11 países con flags)
- Desktop: Dropdown "Servicios" con descripciones
- Mobile: Hamburger menu con navegación completa
- CTA botón: "Agendar Asesoría" → `/asesoria-gratuita`
- WhatsApp flotante integrado

### Sistema de destinos (data-driven)
- **`src/data/destinations.ts`** — Archivo maestro con interfaz `DestinationData` y array `destinations[]`
- **`estudiar-en-[country].astro`** — Ruta dinámica que consume `destinations` via `getStaticPaths()`
- **Países disponibles:** Australia, Canadá, Malta, Dubai, Reino Unido, Nueva Zelanda, Irlanda, España, Alemania, Italia, Estados Unidos

### Blog Completo (`src/pages/blog/`)

#### FASE 1-5: Infraestructura Base (Completado)
- ✅ Configuración de Content Collections en `src/content.config.ts`
- ✅ Sistema de rutas dinámicas `[...slug].astro` para posts individuales
- ✅ Layout especializado `MarkdownLayout.astro`
- ✅ 81 artículos creados en `src/content/blog/`
- ✅ Soporte para frontmatter completo (title, excerpt, date, category, tags, image, author)

#### FASE 6: Content Expansion (Completado)
- ✅ 14 artículos nuevos agregados (81 total)
- ✅ Generación de 200 imágenes con Gemini API (flash-image-preview)
- ✅ Optimización de 311 imágenes a WebP (89% reducción: 518MB → 55MB)
- ✅ Actualización de frontmatter con imágenes destacadas
- ✅ Artículos cubriendo: Australia, Canadá, Irlanda, Malta, Francia, Suecia, Países Bajos, Japón, Corea

#### FASE 7: UI/UX Improvements (Completado - Marzo 2026)
- ✅ **Navbar integrado** — Navegación completa con dropdowns
- ✅ **Hero mejorado** — Gradient animado, stats (81 artículos, categorías, tags), buscador
- ✅ **Filtros funcionales**:
  - Búsqueda en tiempo real (Ctrl+K shortcut)
  - Filtros por categoría con contadores
  - Tags populares para filtrado rápido
  - Indicadores de filtros activos
  - Botón "Limpiar filtros"
- ✅ **Toggle Grid/Lista** — Cambio de vista de posts
- ✅ **Sort por fecha** — Más recientes / más antiguos / más populares
- ✅ **Footer completo** — Con certificaciones, contacto Australia, recursos
- ✅ **Newsletter CTA** — Formulario de suscripción
- ✅ **CTA Final** — Asesoría gratuita + WhatsApp

#### Estructura de cada post de blog
1. **Header** — Imagen destacada con overlay, título, meta info
2. **Content** — Markdown renderizado con tipografía optimizada
3. **Tags** — Lista de tags al final del artículo
4. **Related Posts** — Posts relacionados por categoría
5. **CTA** — Newsletter + asesoría gratuita
6. **Schema.org** — BlogPosting structured data

### Páginas de servicios
- `/servicios/` — Listado de servicios
- `/servicios/gestion-de-visas/` — Gestión de visas
- `/servicios/seleccion-de-cursos/` — Selección de cursos
- `/servicios/alojamiento/` — Alojamiento
- `/servicios/acompanamiento/` — Acompañamiento
- `/servicios/seguro-medico/` — Seguro médico

### Página Nosotros (`src/pages/nosotros.astro`)
- Hero con misión/visión
- Historia de la empresa
- Equipo fundador
- Valores
- Certificaciones (ICEF, PIER)
- Stats (500+ estudiantes, 11 países, etc.)

### Página Asesoría Gratuita
- Formulario de contacto
- Beneficios de la asesoría
- FAQ acordeón
- CTA WhatsApp

### Interfaz `DestinationData` (campos clave)
```typescript
interface DestinationData {
  country: string;           // slug URL (e.g. 'canada')
  name: string;              // nombre display
  flag: string;              // emoji
  heroBg: string;            // URL imagen unsplash
  heroTitle: string;         // usa '—' para split en dos líneas con gradiente
  heroSubtitle: string;
  heroBadge: string;
  heroStats: string;
  heroSecondaryBtn: string;
  painPoints: Array<{...}>;
  benefits: Array<{...}>;
  cities: Array<{ name, image, para }>;
  investmentRows: Array<{ concept, cost }>;
  investmentTotal: string;
  investmentCurrencyNote: string;
  faqs: Array<{ q, a }>;
  ctaTitle: string;
  ctaSubtext: string;
  whatsappMsg: string;       // mensaje URL-encoded para wa.me
  seoTitle: string;
  seoDescription: string;
  canonical: string;
}
```

---

## Convenciones del proyecto

### CSS / Tailwind
- Color de marca: `brand-600` (y variantes: `brand-50`, `brand-100`, `brand-700`)
- Fuente display (headings): Inter (font-weight 700/800)
- Fuente body: Inter (default)
- Blob decorativo: clase `.blob` (círculo blur de fondo)
- Gradiente de texto: clase `.text-gradient`
- Animación: GSAP ScrollTrigger para scroll animations
- Material Symbols: íconos via Google Fonts

### Componentes
- Sin frameworks JS (React/Vue/Svelte) — todo Astro puro
- Interactividad con `<script>` inline en el mismo `.astro`
- Imágenes: WebP optimizadas con Sharp
- WhatsApp links: `https://wa.me/61449159849?text=` + mensaje URL-encoded

### Páginas de destino
- URL pattern: `/estudiar-en-[country]` (slug en español, sin acento, ej. `espana`)
- SEO: título propio por destino, description única, canonical propio
- Schema.org: Organization, WebSite, Blog, BlogPosting

### Blog
- URL pattern: `/blog/[slug]` (slug del post)
- Colección: `src/content/blog/`
- Imágenes: `/public/images/blog/[nombre].webp`
- Categorías: Guías de Países, Visas, Becas, Estudios, Alojamiento, etc.

---

## Skills disponibles (14 total)

| Skill | Categoría | Descripción |
|-------|-----------|-------------|
| `cms-sveltia` | official | Panel admin Git-based con Sveltia CMS |
| `kinto-cms` | official | CMS ligero basado en JSON |
| `blog` | community | Blog con schema.org |
| `contact-form` | community | Formulario con validación |
| `forms-web3forms` | community | Formularios sin backend |
| `testimonials` | community | Testimonios con schema.org Review |
| `cloudflare-pages` | community | Deploy a Cloudflare Pages |
| `cloudflare-tunnel` | community | Túneles permanentes |
| `web-scraper` | community | Scraping con Puppeteer + Cheerio |
| `browser-automation` | community | Testing visual con Puppeteer |
| `image-optimizer` | community | Conversión WebP/AVIF + srcsets |
| `seo-ai-citations` | community | Schema.org completo + llms.txt |
| `webflow-effects` | community | GSAP animations premium |
| `webflow-migration` | community | Migrar sitios Webflow a Astro |
| `i18n` | community | Internacionalización por URL |

### Comandos de skills
```bash
cd sites/globaldreamers
node scripts/skill-list.js          # Ver skills disponibles
node scripts/skill-add.js <name>    # Instalar skill
node scripts/skill-create.js <name> # Crear nueva skill
```

---

## Comandos de desarrollo

```bash
# Desde sites/globaldreamers/
npm install
npm run dev        # Dev server en localhost:4321
npm run build      # Build estático (113 páginas)
npm run preview    # Preview del build
```

---

## Estadísticas del proyecto

| Métrica | Valor |
|---------|-------|
| Total de páginas | 113 páginas estáticas |
| Posts de blog | 81 artículos |
| Imágenes optimizadas | 311 imágenes WebP |
| Reducción de tamaño imágenes | 89% (518MB → 55MB) |
| Países cubiertos | 11 destinos |
| Build time | ~5 segundos |

---

## Pendientes / Próximos pasos

- [ ] Deploy en Cloudflare Pages
- [ ] Configurar dominio globaldreamers.com.au
- [ ] SSL certificate
- [ ] Google Analytics / Tag Manager
- [ ] Search Console verification
- [ ] Sitemap.xml generación
- [ ] RSS feed para blog
- [ ] Newsletter integration (ConvertKit/Mailchimp)
- [ ] Testimonios de clientes
- [ ] Casos de éxito

---

## Principios clave del sistema KINTO

1. **Core mínimo** — zero skills por defecto
2. **Skills bajo demanda** — instalar solo lo necesario via `node scripts/skill-add.js`
3. **Nunca copiar código entre sitios** — crear skills reutilizables si hace falta
4. **CMS oculto** — no enlazado públicamente desde el sitio
5. **100% estático (SSG)** — sin server-side rendering
6. **Lighthouse 95+** — Core Web Vitals en todos los sitios

---

**Última actualización:** Marzo 2026
**Build status:** ✅ 113 páginas generadas exitosamente
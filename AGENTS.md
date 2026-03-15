# AGENTS.md — Inicio Rápido para Cualquier IA

> **Para:** Claude Code, Kimi Code, Cursor, o cualquier IA agente

## Contexto Inmediato

- **Sistema:** KINTO CMS — Generador de sitios estáticos con arquitectura de skills
- **Stack:** Astro 5 + Tailwind CSS 4 + Sveltia CMS
- **Sitio activo:** `sites/globaldreamers/` — Agencia de estudios internacionales para latinoamericanos
- **Dominio:** globaldreamers.com.au
- **CMS (oculto):** glo.kinto.info/admin
- **Estado:** 🟢 Blog completo con 81 artículos, sistema de destinos funcionando, 113 páginas generadas

---

## Lee esto primero

**Lee `CLAUDE.md`** — tiene el contexto completo del proyecto, lo que ya está construido, convenciones CSS, interfaz de datos, y pendientes.

```bash
cat CLAUDE.md
```

---

## Lo que ya existe (no recrear)

### Sitio `sites/globaldreamers/`
- `src/layouts/Layout.astro` — Layout con SEO, OG, Twitter Cards, AI Citations
- `src/layouts/MarkdownLayout.astro` — Layout para posts de blog
- `src/pages/index.astro` — Home completo
- `src/pages/blog/index.astro` — Blog con filtros avanzados (búsqueda, categorías, tags, sort)
- `src/pages/blog/[...slug].astro` — Posts de blog individuales dinámicos
- `src/pages/estudiar-en-[country].astro` — Ruta dinámica data-driven para 11 destinos
- `src/pages/nosotros.astro` — Página Nosotros
- `src/pages/servicios/` — Páginas de servicios
- `src/pages/asesoria-gratuita.astro` — Landing de captación
- `src/data/destinations.ts` — Datos de destinos con interfaz `DestinationData`
- `src/content/blog/` — 81 artículos en Markdown
- `src/components/` — Navbar, Footer, WhatsAppFloat, Hero, Partners, WhyUs, HowItWorks, Destinations, CTABanner, SEOHead, SchemaOrg
- `config/site.config.ts` — Config completa del sitio

---

## Flujo de trabajo

### Paso 1: Orientarte
```bash
# Ver qué hay en el sitio activo
ls sites/globaldreamers/src/pages/
ls sites/globaldreamers/src/components/

# Ver posts de blog
ls sites/globaldreamers/src/content/blog/ | wc -l  # 81 artículos

# Ver skills instaladas
cat sites/globaldreamers/skills-active.json

# Ver skills disponibles
cd sites/globaldreamers && node scripts/skill-list.js
```

### Paso 2: Instalar skills si se necesitan
```bash
cd sites/globaldreamers
node scripts/skill-add.js cloudflare-pages   # Para deploy
node scripts/skill-add.js cms-sveltia        # Para panel de admin
node scripts/skill-add.js testimonials       # Para testimonios
```

### Paso 3: Trabajar en el código
- Editar páginas en `src/pages/`
- Editar componentes en `src/components/`
- Agregar posts de blog en `src/content/blog/`
- Agregar datos de destinos en `src/data/destinations.ts`
- NUNCA copiar código entre sitios — crear skills reutilizables si hace falta

### Paso 4: Verificar
```bash
cd sites/globaldreamers
npm run build    # debe generar 113 páginas sin errores
```

---

## Estructura del Blog (NUEVO - Marzo 2026)

### Página de listado (`src/pages/blog/index.astro`)
- ✅ Navbar sticky con navegación completa
- ✅ Hero con gradiente, stats (81 artículos, categorías, tags)
- ✅ Barra de búsqueda con shortcut Ctrl+K
- ✅ Filtros por categoría con contadores
- ✅ Tags populados para filtrado rápido
- ✅ Toggle Grid/Lista para visualización
- ✅ Sort por fecha (recientes/antiguos/populares)
- ✅ Indicadores de filtros activos
- ✅ Botón "Limpiar todos los filtros"
- ✅ Animaciones staggered en cards
- ✅ Footer completo

### Posts individuales (`src/pages/blog/[...slug].astro`)
- ✅ Layout Markdown con tipografía optimizada
- ✅ Imagen destacada con overlay
- ✅ Breadcrumbs
- ✅ Tags al final del artículo
- ✅ Posts relacionados
- ✅ Schema.org BlogPosting
- ✅ Newsletter CTA

### Colección de contenido (`src/content/blog/`)
- 81 artículos en formato Markdown
- Frontmatter: title, excerpt, date, category, tags, image, author, published
- Imágenes en `/public/images/blog/` (311 imágenes WebP)

---

## Pendientes prioritarios

| Tarea | Dónde | Prioridad |
|-------|-------|-----------|
| Deploy Cloudflare Pages | Instalar `cloudflare-pages` | 🔴 Alta |
| Configurar dominio globaldreamers.com.au | DNS / Cloudflare | 🔴 Alta |
| Google Analytics | Agregar script | 🟡 Media |
| Search Console | Verificación | 🟡 Media |
| Sitemap.xml | Generación automática | 🟡 Media |
| RSS feed | `/blog/rss.xml` | 🟢 Baja |
| Testimonios | Instalar `testimonials` | 🟡 Media |

---

## Estructura importante

```
globaldreamers/                  ← raíz del repo
├── CLAUDE.md                    # ← Contexto completo (léelo)
├── KINTO.md                     # Guía del sistema
├── SKILLS_CATALOG.md            # Catálogo de 14 skills disponibles
├── STRUCTURE.md                 # Arquitectura del sistema
├── sites/
│   └── globaldreamers/          # ← Trabajas aquí
│       ├── KINTO.md             # Brief del cliente
│       ├── config/site.config.ts
│       ├── src/pages/           # Páginas Astro
│       ├── src/components/      # Componentes del sitio
│       ├── src/content/         # Colecciones de contenido (blog)
│       ├── src/data/            # destinations.ts y otros datos
│       └── skills-active.json
└── skills/
    ├── official/                # cms-sveltia, kinto-cms
    └── community/               # 12 skills comunitarias
```

---

## Convenciones CSS / Tailwind

- Color de marca: `brand-600` (variantes: `brand-50`, `brand-100`, `brand-700`)
- Fuente heading: Inter (700/800)
- Fuente body: Inter (400/500/600)
- Blob decorativo: clase `.blob`
- Gradiente de texto: clase `.text-gradient`
- Animaciones: GSAP ScrollTrigger
- WhatsApp links: `https://wa.me/61449159849?text=` + mensaje URL-encoded
- Imágenes: WebP con lazy loading
- Material Symbols: íconos via Google Fonts

---

## Comandos útiles

```bash
# Contar artículos
ls sites/globaldreamers/src/content/blog/ | wc -l

# Buscar en posts
grep -r "keyword" sites/globaldreamers/src/content/blog/

# Ver imágenes sin uso
ls sites/globaldreamers/public/images/blog/

# Build y check
cd sites/globaldreamers && npm run build
```

---

**TL;DR:** Lee `CLAUDE.md`, ve a `sites/globaldreamers`, revisa qué ya está hecho (especialmente el blog con 81 artículos), instala skills si hacen falta, y trabaja sobre lo existente.
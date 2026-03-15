# 🚀 Global Dreamers - Guía del Proyecto

> **Cliente:** Global Dreamers  
> **Industria:** Agencia de estudios internacionales para latinoamericanos  
> **Sitio:** globaldreamers.com.au  
> **CMS (oculto):** glo.kinto.info  
> **Repo:** https://github.com/1511170/globaldreamers.git

---

## ⚡ Comandos Rápidos

```bash
# Estás en: kinto-cms/sites/globaldreamers/

# Ver skills instaladas
cat skills-active.json

# Instalar skills disponibles
node scripts/skill-add.js cms-sveltia
node scripts/skill-add.js {SKILL_NAME}

# Crear skill específica
node scripts/skill-create.js {NEW_SKILL}

# Dev server
npm install
npm run dev

# Build
npm run build
```

---

## 🎯 Brief del Cliente

**Global Dreamers** es una agencia de educación internacional basada en Australia (Melbourne, Victoria) que ayuda a latinoamericanos a cumplir su sueño de estudiar en el exterior.

### Información de la Empresa
- **Nombre legal:** Global Dreamers Pty Ltd
- **ABN:** 12 345 678 901
- **ACN:** 123 456 789
- **Ubicación:** Melbourne, Victoria, Australia
- **Contacto:** info@globaldreamers.com.au / +61 449 159 849
- **Certificaciones:** ICEF Accredited Agency #5642, PIER Qualified

### Páginas Completadas ✅
- [x] **Home** — Hero, servicios, partners, proceso, destinos, CTA
- [x] **Nosotros** — Historia, equipo, valores, certificaciones
- [x] **Blog** — 81 artículos con filtros avanzados (búsqueda, categorías, tags)
- [x] **Servicios** — Listado y páginas individuales de servicios
- [x] **Asesoría Gratuita** — Landing de captación con formulario
- [x] **Destinos** — 11 países con páginas dinámicas

### Funcionalidades Implementadas
- [x] Sistema de blog completo (81 artículos)
- [x] Filtros avanzados de blog (búsqueda, categorías, tags, sort)
- [x] SEO optimizado (meta tags, Open Graph, Twitter Cards)
- [x] Schema.org structured data
- [x] 311 imágenes optimizadas a WebP (89% reducción)
- [x] Diseño responsive
- [x] Animaciones GSAP + ScrollTrigger
- [ ] CMS para edición sin código (pendiente)

### Identidad Visual
- **Colores primarios:** brand-600 (#valor), brand-50, brand-100, brand-700
- **Estilo:** Profesional, moderno, inspirador
- **Fuentes:** Inter (headings + body), Material Symbols (íconos)
- **Imágenes:** WebP optimizadas, lazy loading

---

## 📁 Estructura del Sitio

```
sites/globaldreamers/
├── config/
│   └── site.config.ts         # Config sitio, CMS, build
├── src/
│   ├── pages/                 # Rutas Astro
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro   # ← Listado con filtros avanzados
│   │   │   └── [...slug].astro
│   │   ├── estudiar-en-[country].astro
│   │   ├── nosotros.astro
│   │   ├── servicios.astro
│   │   ├── servicios/
│   │   └── asesoria-gratuita.astro
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── MarkdownLayout.astro
│   ├── components/
│   │   ├── Navbar.astro      # Sticky con dropdowns
│   │   ├── Footer.astro      # Certificaciones, contacto AU
│   │   ├── WhatsAppFloat.astro
│   │   ├── SEOHead.astro
│   │   └── SchemaOrg.astro
│   ├── data/
│   │   └── destinations.ts   # 11 países
│   ├── content/
│   │   └── blog/             # 81 artículos .md
│   └── styles/
│       └── global.css
├── public/
│   └── images/
│       ├── blog/             # 311 imágenes WebP
│       ├── destinations/
│       └── logos/
└── skills-active.json
```

---

## 🔧 Configuración

### Site Config (`config/site.config.ts`)
```typescript
{
  site: {
    domain: 'globaldreamers.com.au',
    name: 'Global Dreamers',
    description: 'Agencia de estudios internacionales para latinoamericanos',
    language: 'es',
    logo: '/images/logo-globaldreamers-color.png'
  },
  cms: {
    enabled: true,
    subdomain: 'glo.kinto.info',
    hidden: true,
    githubRepo: '1511170/globaldreamers'
  },
  build: {
    output: 'static',
    compressHTML: true
  }
}
```

---

## 📝 Sistema de Blog

### Colección de Contenido
- **Ubicación:** `src/content/blog/`
- **Formato:** Markdown (.md)
- **Total:** 81 artículos
- **Imágenes:** 311 archivos WebP en `public/images/blog/`

### Frontmatter Schema
```yaml
---
title: "Título del artículo"
excerpt: "Descripción corta para SEO y previews"
date: 2026-03-14
category: "Guías de Países"  # o Visas, Becas, Estudios, etc.
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/nombre-imagen.webp"
author: "Global Dreamers"
published: true
---
```

### Categorías Disponibles
- Guías de Países (Australia, Canadá, Irlanda, etc.)
- Visas y Documentación
- Becas y Financiamiento
- Estudios y Carreras
- Alojamiento
- Experiencias de Estudiantes
- Trabajo y Vida en el Exterior

### Página de Listado (Blog Index)
- ✅ Navbar sticky con navegación completa
- ✅ Hero con gradiente y stats (81 artículos)
- ✅ Búsqueda en tiempo real (Ctrl+K)
- ✅ Filtros por categoría con contadores
- ✅ Tags populares para filtrado
- ✅ Toggle Grid/Lista
- ✅ Sort por fecha
- ✅ Footer completo

---

## 🌍 Destinos Disponibles (11 países)

1. **Australia** — estudiar-en-australia
2. **Canadá** — estudiar-en-canada
3. **Malta** — estudiar-en-malta
4. **Dubai** — estudiar-en-dubai
5. **Reino Unido** — estudiar-en-reino-unido
6. **Nueva Zelanda** — estudiar-en-nueva-zelanda
7. **Irlanda** — estudiar-en-irlanda
8. **España** — estudiar-en-espana
9. **Alemania** — estudiar-en-alemania
10. **Italia** — estudiar-en-italia
11. **Estados Unidos** — estudiar-en-estados-unidos

---

## 🧩 Skills Recomendadas

| Skill | Propósito | Estado |
|-------|-----------|--------|
| `cms-sveltia` | Panel admin | ⬜ Pendiente |
| `testimonials` | Testimonios clientes | ⬜ Pendiente |
| `cloudflare-pages` | Deploy | ⬜ Pendiente |
| `seo-ai-citations` | Schema.org avanzado | ⬜ Pendiente |

**Instalar:**
```bash
node scripts/skill-add.js cloudflare-pages
```

---

## ✅ Checklist de Entrega

- [x] Páginas principales completas (Home, Nosotros, Blog, Servicios)
- [x] Blog con 81 artículos y sistema de filtros avanzado
- [x] Sistema de destinos (11 países)
- [x] SEO (meta tags, OG, Twitter Cards)
- [x] Imágenes optimizadas (311 WebP)
- [x] Build exitoso (113 páginas)
- [ ] CMS instalado y configurado
- [ ] Deploy en Cloudflare Pages
- [ ] Dominio configurado

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Total de páginas | 113 |
| Posts de blog | 81 |
| Imágenes optimizadas | 311 WebP |
| Reducción tamaño imágenes | 89% (518MB → 55MB) |
| Países cubiertos | 11 |
| Categorías de blog | 7+ |
| Build time | ~5 segundos |

---

## 🆘 Referencias

- [Guía Principal](../../CLAUDE.md)
- [AI Generation Guide](../../docs/AI_GENERATION.md)
- [Arquitectura](../../STRUCTURE.md)
- [Catálogo de Skills](../../SKILLS_CATALOG.md)

---

**Estado:** 🟢 Completo (pendiente deploy)

**Próximo paso:** Configurar Cloudflare Pages y deploy del sitio.
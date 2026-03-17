# 🚀 KINTO CMS - Guía de Inicio Rápido para IA

> **TL;DR**: Sistema de sitios estáticos con arquitectura de **skills bajo demanda**. Core mínimo (Astro + Tailwind) + skills que se instalan solo cuando se necesitan.

---

## ⚡ Comandos Esenciales (Empezar Aquí)

```bash
# 1. Entrar al sitio del cliente
cd sites/serviworldlogistics

# 2. Ver skills disponibles
node scripts/skill-list.js

# 3. Instalar skills necesarias
node scripts/skill-add.js cms-sveltia
node scripts/skill-add.js testimonials

# 4. Crear nueva skill (si no existe la que necesitas)
node scripts/skill-create.js mi-nueva-skill

# 5. Instalar dependencias y correr
npm install
npm run dev
```

---

## 🧠 Principios Clave

### 1. **ZERO Skills por Defecto**
Cada sitio arranca limpio (solo Astro + Tailwind). No instales nada que no se pida explícitamente.

### 2. **Skills = Plugins Reutilizables**
- Ubicación: `kinto-cms/skills/{official,community}/`
- Una vez creada una skill → disponible para TODOS los sitios
- Si necesitas funcionalidad nueva, crea una skill, no código ad-hoc

### 3. **CMS Oculto**
- Sitio público: `serviworldlogistics.com`
- CMS privado: `swl.kinto.info/admin` (sin enlaces públicos)
- El cliente edita contenido sin tocar código

---

## 📁 Estructura de Trabajo

```
kinto-cms/
├── skills/
│   ├── official/          # Skills oficiales (CMS, SEO, etc)
│   │   └── cms-sveltia/
│   └── community/         # Skills creadas por IA
│       └── testimonials/
├── sites/
│   └── serviworldlogistics/    # ← Trabajas aquí
│       ├── src/pages/          # Páginas Astro
│       ├── config/             # site.config.ts
│       └── skills-active.json  # Skills instaladas
└── core/                  # No tocar - motor base
```

---

## 🎯 Workflow de Generación

### Paso 1: Analizar el Brief
Ejemplo: *"Necesito página de inicio con hero, servicios, testimonios y un formulario de contacto"*

### Paso 2: Revisar Skills Existentes
```bash
node scripts/skill-list.js
```

**Skills disponibles actualmente:**
- ✅ `cms-sveltia` - Panel de admin para el cliente
- ✅ `testimonials` - Testimonios con schema.org

### Paso 3: Instalar Skills Necesarias
```bash
node scripts/skill-add.js cms-sveltia
node scripts/skill-add.js testimonials
```

### Paso 4: Generar Contenido
Editar `src/pages/index.astro` y crear las páginas necesarias usando las skills instaladas.

### Paso 5: Si Falta una Skill, Crearla
```bash
# Ejemplo: Necesitamos un formulario de contacto
node scripts/skill-create.js contact-form

# Esto crea: skills/community/contact-form/
# Luego implementas la skill y la usas
```

---

## 🛠️ Crear una Nueva Skill

Cuando el cliente necesita algo que no existe:

```bash
node scripts/skill-create.js nombre-skill
```

Esto crea:
```
skills/community/nombre-skill/
├── SKILL.md              # Documentación
├── index.ts              # Entry point
├── components/           # Componentes Astro
└── config/               # Configuración
```

**Reglas para crear skills:**
1. La skill debe ser **reutilizable** en otros sitios
2. Documentar en `SKILL.md` cómo usarla
3. Exportar componentes en `index.ts`
4. Usar `schema.org` si aplica (SEO)

---

## 📋 Checklist antes de entregar

- [ ] Todas las skills necesarias instaladas en `skills-active.json`
- [ ] CMS configurado en `config/site.config.ts`
- [ ] Schema.org en lugares relevantes (SEO)
- [ ] Imágenes optimizadas en `public/`
- [ ] Build exitoso: `npm run build`
- [ ] Preview funciona: `npm run preview`
- [ ] Deploy a `globaldreamers-static` si aplica

## 🚀 Deploy Workflow (Global Dreamers)

**IMPORTANTE:** Para Global Dreamers, el deploy se hace al repo estático:

```bash
# 1. Build
cd sites/globaldreamers
npm run build

# 2. Copiar a repo estático (desde raíz)
cd ../..
cp -Recurse -Force sites/globaldreamers/dist/* globaldreamers-static/

# 3. Commit y push (globaldreamers-static es un repo Git separado)
cd globaldreamers-static
git add -A
git commit -m "Deploy: descripción"
git push origin master
```

**Nota:** `globaldreamers-static` tiene su propio `.git` y apunta a `https://github.com/1511170/globaldreamers-static.git`

**Repos:**
- Source: `https://github.com/1511170/globaldreamers.git` (código fuente)
- Static: `https://github.com/1511170/globaldreamers-static.git` (build estático)
- Producción: `https://1511170.github.io/globaldreamers/`

---

## 🔗 Referencias Rápidas

| Recurso | Ubicación |
|---------|-----------|
| Config sitio | `sites/serviworldlogistics/config/site.config.ts` |
| Skills activas | `sites/serviworldlogistics/skills-active.json` |
| Skills disponibles | `kinto-cms/skills/` |
| Guía completa IA | `kinto-cms/docs/AI_GENERATION.md` |
| Arquitectura | `kinto-cms/STRUCTURE.md` |

---

## 💡 Patrones Comunes

### Importar una skill en una página:
```astro
---
import { TestimonialsGrid } from '../../../skills/community/testimonials/index.ts';
---

<TestimonialsGrid category="logistics" max={6} />
```

### Verificar si una skill está activa:
```typescript
import activeSkills from '../skills-active.json';

const hasTestimonials = activeSkills.skills.includes('testimonials');
```

---

## 🆘 ¿Atascado?

1. **Ver skills disponibles**: `node scripts/skill-list.js`
2. **Ver config del sitio**: `cat config/site.config.ts`
3. **Ver skills activas**: `cat skills-active.json`
4. **Leer documentación**: `cat docs/AI_GENERATION.md`

---

**Empieza aquí:**
```bash
cd sites/serviworldlogistics && node scripts/skill-list.js
```

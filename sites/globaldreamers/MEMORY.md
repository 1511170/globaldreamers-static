# MEMORY.md - Historial de Desarrollo Global Dreamers

> **Fecha última actualización:** 2026-03-15  
> **Versión proyecto:** 1.0  
> **Total commits:** 8 en main, 6 en master (static)

---

## 📋 Historial Completo de Tareas

### Sesión 1: Fundamentos y Navbar
**Fecha:** 2026-03-14  
**Commits:**
- `529cc8b` - Add services dropdown menu with icons in navbar

**Cambios:**
- Navbar con dropdown expandible de servicios
- Iconos Material Symbols para cada servicio
- Dropdown de destinos con banderas (circle-flags CDN)
- Menú móvil actualizado con sección de servicios

---

### Sesión 2: Página de Gestión de Visas
**Fecha:** 2026-03-15  
**Commits:**
- `3626630` - Add visa management service page with SEO and process timeline

**Cambios:**
- Nueva página: `/servicios/gestion-de-visas/`
- Hero con CTA a WhatsApp
- Stats bar: +15k visas, 99% éxito, 24/7 soporte
- Timeline de proceso (3 pasos)
- 5 FAQs sobre visas
- Schema.org: Service, FAQPage, HowTo, BreadcrumbList

---

### Sesión 3: Completar Páginas de Servicios
**Fecha:** 2026-03-15  
**Commits:**
- `ee95695` - Add 4 service pages: courses, accommodation, accompaniment, health insurance

**Cambios:**

#### 1. Selección de Cursos
- **URL:** `/servicios/seleccion-de-cursos/`
- 4 tipos de cursos: Inglés, Diplomados, Pregrados, Posgrados
- Timeline de proceso (3 pasos)
- 5 FAQs
- Stats: +50 instituciones, +200 programas

#### 2. Alojamiento
- **URL:** `/servicios/alojamiento/`
- 4 tipos: Homestay, Residencia, Apartamento compartido, Temporal
- Precios desde $400/semana a $800/mes
- 4 FAQs sobre alojamiento

#### 3. Acompañamiento
- **URL:** `/servicios/acompanamiento/`
- 6 servicios de soporte
- Timeline en 4 fases (Antes de viajar → Llegada → Primera semana → Estancia)
- Testimonial incluido
- 4 FAQs

#### 4. Seguro Médico
- **URL:** `/servicios/seguro-medico/`
- 6 tipos de cobertura (con badges "Obligatorio")
- Cobertura por país (6 destinos con precios)
- 4 FAQs

---

## 🏗️ Arquitectura Implementada

### Estructura de Servicios
```
/servicios/
├── index.astro                    # Landing de servicios
├── gestion-de-visas/
│   └── index.astro               # ✅ Completo
├── seleccion-de-cursos/
│   └── index.astro               # ✅ Completo
├── alojamiento/
│   └── index.astro               # ✅ Completo
├── acompanamiento/
│   └── index.astro               # ✅ Completo
└── seguro-medico/
    └── index.astro               # ✅ Completo
```

### Navbar - Servicios Dropdown
```typescript
const servicesNavItems = [
  { label: 'Asesoría Gratuita', href: '/asesoria-gratuita', icon: 'support_agent' },
  { label: 'Gestión de Visa', href: '/servicios/gestion-de-visas/', icon: 'description' },
  { label: 'Selección de Cursos', href: '/servicios/seleccion-de-cursos/', icon: 'school' },
  { label: 'Alojamiento', href: '/servicios/alojamiento/', icon: 'apartment' },
  { label: 'Acompañamiento', href: '/servicios/acompanamiento/', icon: 'flight_takeoff' },
  { label: 'Seguro Médico', href: '/servicios/seguro-medico/', icon: 'health_and_safety' },
];
```

---

## 🎨 Sistema de Diseño Utilizado

### Colores
- **Primary:** `#41c5f3` (cyan/sky blue) → Tailwind: `primary`, `bg-primary`, `text-primary`
- **Background light:** `#f6f8f8`
- **Background dark:** `#101d22`
- **Text:** `text-slate-900` (headings), `text-slate-600` (body)

### Componentes Reutilizables
- **Stats bar:** Fondo `bg-slate-900` con texto `text-primary`
- **Cards:** `bg-white`, `rounded-2xl`, `border border-slate-200`, `hover:border-primary/50`
- **Timeline:** Línea vertical con números circulares `bg-primary`
- **CTA Section:** `bg-slate-900` con gradiente sutil, botones WhatsApp

### Iconografía
- **Fuente:** Material Symbols Outlined
- **CDN:** `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined`

### Layout
- **Max width:** `max-w-[1200px]` mx-auto
- **Padding:** `px-4 sm:px-6 lg:px-8`
- **Spacing sections:** `py-20 lg:py-24`

---

## 📞 Contacto / CTAs

**WhatsApp:** +61 449 159 849  
**URLs de WhatsApp usadas:**
```
https://wa.me/61449159849?text=Hola%2C%20quiero%20iniciar%20mi%20tr%C3%A1mite%20de%20visa
https://wa.me/61449159849?text=Hola%2C%20quiero%20agendar%20mi%20asesor%C3%ADa%20gratuita
https://wa.me/61449159849?text=Hola%2C%20quiero%20encontrar%20mi%20curso%20ideal
https://wa.me/61449159849?text=Hola%2C%20necesito%20ayuda%20con%20alojamiento
https://wa.me/61449159849?text=Hola%2C%20quiero%20acompa%C3%B1amiento%20en%20mi%20viaje
https://wa.me/61449159849?text=Hola%2C%20quiero%20cotizar%20un%20seguro%20m%C3%A9dico
```

---

## 🔍 SEO Implementado

### Schema.org por página
Todas las páginas de servicios incluyen:
- `Organization` - Datos de Global Dreamers
- `Service` - Información del servicio específico
- `BreadcrumbList` - Navegación jerárquica
- `FAQPage` - Preguntas frecuentes
- `HowTo` - Proceso paso a paso (donde aplica)

### Keywords por servicio
| Página | Keywords principales |
|--------|---------------------|
| Gestión de Visas | visa estudiante, tramite visa australia, visa canada, visa tier 4 |
| Selección de Cursos | cursos inglés exterior, diplomados internacionales, pregrados, posgrados |
| Alojamiento | homestay australia, residencia estudiantil, apartamento estudiantes |
| Acompañamiento | acompañamiento viaje estudio, recogida aeropuerto, orientación |
| Seguro Médico | seguro medico estudiantes, oshc australia, cobertura medica |

---

## 🚦 Estado del Proyecto

### ✅ Completado
- [x] Navbar con dropdown de servicios e iconos
- [x] Página de Asesoría Gratuita
- [x] Página de Gestión de Visas
- [x] Página de Selección de Cursos
- [x] Página de Alojamiento
- [x] Página de Acompañamiento
- [x] Página de Seguro Médico
- [x] 11 páginas de destinos (Australia, Canadá, UK, etc.)
- [x] 11 Journey Builders (planners)
- [x] Schema.org en todas las páginas principales
- [x] Repositorio principal (`main`)
- [x] Repositorio estático (`master`)

### ⏳ Pendiente
- [ ] Configurar CMS Sveltia
- [ ] Página de Blog con posts
- [ ] Página Nosotros completa
- [ ] Deploy en Cloudflare Pages
- [ ] OG images (1200x630)
- [ ] Favicon y logo SVG
- [ ] llms.txt para AI citations

---

## 📝 Notas para Futuras Sesiones

### Estructura de páginas de servicio
Todas las páginas de servicio siguen un patrón consistente:
1. Hero con headline, descripción, CTA dual
2. Stats bar (fondo oscuro)
3. Grid de servicios/features
4. Timeline o proceso (si aplica)
5. Sección de destinos/países (si aplica)
6. FAQ accordion
7. CTA final

### Agregar nuevo servicio
Para crear una nueva página de servicio:
1. Copiar estructura de `servicios/gestion-de-visas.astro`
2. Actualizar: título, description, keywords, FAQs
3. Ajustar contenido de secciones
4. Agregar al navbar en `components/Navbar.astro`
5. Crear breadcrumbs y schemaData

### Build y Deploy
```bash
# Build
npm run build

# Verificar 31 páginas generadas

# Copiar a static
robocopy dist ..\globaldreamers-static\ /MIR

# Commits
git add -A
git commit -m "descripción"
git push origin main      # repo código
git push origin master    # repo estático
```

---

## 🔗 Repositorios

| Repo | Branch | Propósito |
|------|--------|-----------|
| `1511170/globaldreamers` | `main` | Código fuente Astro |
| `1511170/globaldreamers-static` | `master` | HTML estático para deploy |

---

**Última actualización:** 2026-03-15 por Kimi Code  
**Próxima acción sugerida:** Configurar Cloudflare Pages para el repo estático

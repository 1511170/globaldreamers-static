# PLAN - Efectos Webflow Premium para Global Dreamers

> **Objetivo:** Transformar el sitio con animaciones profesionales tipo Webflow  
> **Fecha:** 2026-03-15  
> **Estimación:** 3-4 sesiones de trabajo

---

## 🎯 Visión General

Transformar Global Dreamers de un sitio estático a una experiencia inmersiva con:
- **Micro-interacciones** en todos los elementos clickeables
- **Animaciones de scroll** que guían la atención del usuario
- **Efectos hover premium** que comunican calidad y profesionalismo
- **Transiciones suaves** entre secciones

---

## 📋 Fases de Implementación

### FASE 1: Fundamentos (Sesión 1)
**Objetivo:** Instalar dependencias y crear sistema base de animaciones

#### 1.1 Instalación de Dependencias
```bash
npm install gsap --legacy-peer-deps
```

#### 1.2 Crear Archivo de Animaciones Base
**Archivo:** `src/scripts/animations.js`

**Funcionalidades:**
- [ ] Intersection Observer nativo (ligero, no depende de GSAP)
- [ ] Clases utilitarias CSS para animaciones
- [ ] Reducir motion para accesibilidad

#### 1.3 Clases CSS de Animación
**Archivo:** `src/styles/animations.css`

```css
/* Animaciones de entrada */
.animate-on-scroll      /* Fade up básico */
.animate-scale          /* Scale from 0.9 */
.animate-slide-left     /* Slide from left */
.animate-slide-right    /* Slide from right */

/* Delays escalonados */
.delay-100, .delay-200, .delay-300, .delay-400, .delay-500

/* Hover effects */
.hover-lift             /* Elevación suave */
.hover-glow             /* Brillo en hover */
.hover-scale            /* Escala en hover */
.hover-rotate           /* Rotación sutil */

/* Efectos continuos */
.animate-float          /* Flotación suave */
.animate-pulse-soft     /* Pulso sutil */
```

#### 1.4 Integrar en Layout
- [ ] Importar CSS en Layout.astro
- [ ] Importar JS al final del body

---

### FASE 2: Hero Section Premium (Sesión 1-2)
**Archivo:** `src/components/HeroPremium.astro` (reemplaza Hero actual)

#### Efectos a implementar:

| Efecto | Descripción | Tecnología |
|--------|-------------|------------|
| **Text Reveal** | Letras aparecen una por una al cargar | GSAP SplitText o CSS |
| **Gradient Orbs** | Círculos blur animados en fondo | CSS animations |
| **Parallax Hero** | Imagen se mueve más lento que el texto | GSAP ScrollTrigger |
| **Floating Badge** | Badge de "99% éxito" flota suavemente | CSS float animation |
| **Stats Counter** | Números animan desde 0 al aparecer | GSAP/JS |
| **Mouse Parallax** | Elementos siguen levemente el cursor | JS mousemove |

#### Componentes nuevos:
- [ ] `AnimatedText` - Texto con revelado letra por letra
- [ ] `GradientBackground` - Fondo con orbes animados
- [ ] `FloatingElement` - Contenedor para elementos flotantes
- [ ] `Counter` - Números animados

---

### FASE 3: Servicios con Efectos 3D (Sesión 2)
**Archivo:** Modificar grid de servicios en Home y página /servicios

#### Efectos por tarjeta:

```
┌─────────────────────────────────────┐
│  🎯 HOVER ENTRADA                   │
│  • Card se eleva (translateY -10px) │
│  • Sombra aumenta                   │
│  • Icono escala 1.1x                │
│  • Border cambia a color primary    │
├─────────────────────────────────────┤
│  ✨ HOVER SALIDA                    │
│  • Todo vuelve a posición original  │
│  • Transición suave 0.3s            │
└─────────────────────────────────────┘
```

#### Efectos de Scroll:
- [ ] Cards aparecen con **stagger** (una tras otra, 100ms de delay)
- [ ] Animación desde abajo con fade
- [ ] Efecto "deck of cards" opcional

#### Micro-interacciones en iconos:
- [ ] Rotación sutil al hacer hover (5-10 grados)
- [ ] Escala 1.1x con spring easing

---

### FASE 4: Destinos con Parallax (Sesión 2-3)
**Archivo:** `src/components/DestinationsAnimated.astro`

#### Efectos:

| Elemento | Efecto | Detalle |
|----------|--------|---------|
| **Cards de destino** | Hover 3D | Tilt effect siguiendo mouse |
| **Banderas** | Spin on hover | Rotación 360° suave |
| **Imágenes** | Zoom suave | Scale 1.05 en hover |
| **Texto** | Slide up | Aparece desde abajo |

#### Tilt Effect (3D Card):
```javascript
// Al mover mouse sobre card:
// - Calcular posición relativa X, Y
// - Aplicar rotateX y rotateY (máx 10°)
// - Agregar perspective al contenedor
// - Volver a plano al salir
```

---

### FASE 5: Navbar y Navegación (Sesión 3)
**Archivo:** `src/components/Navbar.astro` (mejoras)

#### Efectos:

- [ ] **Scroll-triggered hide/show:**
  - Ocultar al bajar (para más espacio)
  - Mostrar al subir (para navegación)
  - Transición suave 0.3s

- [ ] **Dropdown animations:**
  - Fade + slide down
  - Stagger en items del dropdown
  - Hover persistente

- [ ] **Active state indicator:**
  - Línea o punto animado bajo item activo
  - Transición suave entre items

- [ ] **Logo animation:**
  - Subtle pulse o glow en hover

---

### FASE 6: Testimonios Carousel (Sesión 3)
**Archivo:** Nuevo `src/components/TestimonialsCarousel.astro`

#### Efectos:

- [ ] **Auto-play carousel** con pausa en hover
- [ ] **Slide transitions:** Fade o slide horizontal suave
- [ ] **Quote marks:** Grandes y animadas
- [ ] **Avatar:** Border animado o glow
- [ ] **Navigation dots:** Expandidos en hover

---

### FASE 7: CTAs y Botones (Sesión 3)
**Afecta a:** Todos los botones del sitio

#### Efectos de botón premium:

```
┌────────────────────────────────────────┐
│     BOTÓN PRIMARIO (antes/despues)     │
├────────────────────────────────────────┤
│  NORMAL          │  HOVER              │
│  ─────────────   │  ─────────────      │
│  bg: primary     │  bg: primary-light  │
│  scale: 1        │  scale: 1.02        │
│  shadow: sm      │  shadow: xl glow    │
│  translateY: 0   │  translateY: -2px   │
│                  │  icon: translateX   │
└────────────────────────────────────────┘
```

#### Efectos especiales:
- [ ] **Magnetic button** (opcional): Sigue ligeramente el cursor
- [ ] **Ripple effect**: Onda al hacer click
- [ ] **Shine effect**: Brillo que pasa al hover

---

### FASE 8: Secciones de Proceso (Sesión 4)
**Afecta a:** Páginas de servicios con timeline

#### Timeline animado:

- [ ] **Line drawing:** La línea del timeline se "dibuja" al hacer scroll
- [ ] **Dots pulse:** Cada nodo pulsa cuando se activa
- [ ] **Content reveal:** Texto aparece al llegar al nodo
- [ ] **Connector animation:** Líneas conectoras animadas

---

### FASE 9: Footer y Detalles (Sesión 4)

#### Efectos:
- [ ] **Social icons:** Hover con color brand + scale
- [ ] **Links:** Underline animation (crece desde centro)
- [ ] **Back to top:** Aparece después de scroll, smooth scroll

---

## 🎨 Sistema de Diseño de Animaciones

### Timing Functions
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Duraciones
| Tipo | Duración | Uso |
|------|----------|-----|
| Micro | 150-200ms | Hover, clicks |
| Standard | 300-400ms | Transiciones |
| Entrance | 500-700ms | Scroll reveals |
| Dramatic | 800-1200ms | Hero animations |

### Stagger Delays
```
Item 1: 0ms
Item 2: 100ms
Item 3: 200ms
Item 4: 300ms
...
```

---

## 📁 Archivos a Crear/Modificar

### Nuevos archivos:
```
src/
├── scripts/
│   └── animations.js          # Lógica de animaciones
├── styles/
│   └── animations.css         # Clases CSS
├── components/
│   ├── HeroPremium.astro      # Hero con efectos
│   ├── TiltCard.astro         # Card con efecto 3D
│   ├── AnimatedCounter.astro  # Números animados
│   ├── ScrollReveal.astro     # Wrapper para scroll animations
│   ├── MagneticButton.astro   # Botón magnético
│   └── TestimonialsCarousel.astro  # Carrusel testimonios
```

### Modificaciones:
```
src/
├── layouts/
│   └── Layout.astro           # Agregar scripts y CSS
├── components/
│   ├── Navbar.astro           # Efectos de scroll
│   ├── DestinationsHome.astro # Efectos 3D
│   └── Footer.astro           # Micro-interacciones
└── pages/
    └── index.astro            # Usar HeroPremium
```

---

## ✅ Checklist de Implementación

### Fase 1: Fundamentos
- [ ] Instalar GSAP
- [ ] Crear animations.css
- [ ] Crear animations.js
- [ ] Integrar en Layout

### Fase 2: Hero
- [ ] Crear HeroPremium.astro
- [ ] Implementar text reveal
- [ ] Agregar gradient orbs
- [ ] Counter animation
- [ ] Floating badges

### Fase 3: Servicios
- [ ] Hover effects en cards
- [ ] Stagger animation
- [ ] Icon animations

### Fase 4: Destinos
- [ ] Tilt effect
- [ ] Flag spin
- [ ] Image zoom

### Fase 5: Navbar
- [ ] Hide/show on scroll
- [ ] Dropdown animations
- [ ] Active indicator

### Fase 6: Testimonios
- [ ] Carrusel component
- [ ] Auto-play
- [ ] Transitions

### Fase 7: Botones
- [ ] Magnetic effect
- [ ] Shine effect
- [ ] Ripple effect

### Fase 8: Timeline
- [ ] Line drawing
- [ ] Node animations

### Fase 9: Footer
- [ ] Link underlines
- [ ] Social icons
- [ ] Back to top

---

## 🚀 Cómo empezar

1. **Aprobar este plan**
2. **Empezar con Fase 1** (fundamentos)
3. **Probar en dev** (`npm run dev`)
4. **Iterar** fase por fase

---

## 💡 Notas técnicas

- Usar `prefers-reduced-motion` para accesibilidad
- GSAP ScrollTrigger para scroll-based animations
- CSS nativo para simple hover effects (mejor performance)
- Lazy loading de animaciones (no cargar en móvil si es pesado)

---

**¿Aprobamos el plan y comenzamos?** 🚀

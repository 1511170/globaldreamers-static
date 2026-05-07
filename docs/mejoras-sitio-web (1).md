# Mejoras al sitio web de Global Dreamers

Basado en la reunión Kinto × Global Dreamers del 22 de abril entre Nathali Sánchez y Camilo Cuadros.

## Objetivo principal

Convertir el sitio web en una **página de filtro** para que solo los leads verdaderamente calificados lleguen al equipo comercial. El problema actual es que están entrando muchos leads sin perfil (sin dinero, sin idioma, sin nivel educativo adecuado) y eso está generando gasto sin retorno.

---

## 1. Corregir información de precios y datos (URGENTE)

Hay errores críticos en los precios mostrados que están desfasando las expectativas de los estudiantes y generando problemas en la asesoría posterior.

### Errores detectados

- **Visa de Australia:** el planner muestra USD 860, cuando el costo real es aproximadamente **USD 2.000**. La diferencia (USD 1.200) equivale a 2-3 millones de pesos colombianos, una diferencia inaceptable.
- **Curso de inglés:** se muestra USD 11.000 como promedio. Subir a un rango más realista (USD 12.000-13.000) para evitar sorpresas.

### Información que debe quedar clara y correcta para cada país

Para cada destino prioritario hay que tener publicado:

- Costo de la visa
- Costo promedio de un programa de 6 meses
- Costo del seguro médico (premium / homestay según corresponda)
- Edad mínima/máxima recomendada
- Requisitos de nivel educativo
- Si permite o no permite trabajar legalmente

### Países prioritarios (en orden)

1. Australia
2. Nueva Zelanda
3. Canadá
4. Estados Unidos

Países como Italia, Alemania, Dubái e Irlanda quedan desactivados (Irlanda porque el perfil termina yéndose a Australia; Dubái porque requiere inglés que el cliente promedio no tiene).

---

## 2. Eliminar todos los puntos de contacto vía WhatsApp

Actualmente la gente está saltándose los filtros del sitio porque encuentra el botón de WhatsApp en múltiples lugares. La solución es **quitar WhatsApp del sitio** y forzar el uso del planner.

Tareas concretas:

- Quitar el botón flotante de WhatsApp en todo el sitio
- Quitar el WhatsApp del home (incluso el que aparece al hacer scroll hasta abajo)
- Quitar WhatsApp de las páginas de programas
- Quitar WhatsApp del flujo del planner (actualmente aparece después de mostrar el precio)
- Considerar ocultar también el número de teléfono para reforzar que el único canal sea el planner
- El único canal que debe quedar visible es el **planner** (y eventualmente la agenda, una vez el usuario clasifique)

---

## 3. Rediseñar el planner como un sistema de clasificación condicional

El planner es la herramienta más fuerte que tiene el sitio, pero hoy es **lineal** (todos pasan por las mismas preguntas) y no filtra. Hay que convertirlo en un flujo **condicional** que descalifique a los perfiles no genuinos.

### Cómo debe funcionar

- El flujo cambia según las respuestas. Si pone 35 años → se le pregunta si tiene maestría y años de experiencia. Si pone 27 años con universidad → sigue otra ruta.
- Cada respuesta que no califica genera un "game over" amable: *"Lamentablemente en esta ocasión no podríamos ayudarte. Te deseamos mucho éxito."*
- Solo quien pasa todos los filtros llega a desbloquear la agenda de asesoría.
- No es un formulario aburrido: el flujo sigue siendo ameno, da tips e información ("con 8 meses puedes acceder a tal", "el inglés cuesta más o menos tanto").

### Filtros que debe aplicar (condicionales de descalificación)

Son los criterios que Nathali tiene que entregar antes del domingo, por país. Pero a nivel general:

- **Edad:** si tiene más de 30 sin estudios universitarios o maestría → no aplica
- **Nivel educativo:** bachillerato solo no es perfil genuino para destinos como Canadá o Australia
- **Idioma:** si no tiene inglés y no tiene dinero para pagar curso → no aplica
- **Capacidad económica:** si la intención es "irse gratis" o estudiar con beca al 100% → no aplica (Global Dreamers no tramita becas)
- **Coherencia del proyecto migratorio:** alguien de 39 años, bachiller, queriendo estudiar enfermería en Canadá no es genuino para migración

### Recurso para los descalificados

Para los que no pasan los filtros, ofrecer un **PDF descargable** con una guía de qué hacer desde hoy para algún día poder aplicar. Esto deja una experiencia positiva sin abrir un canal de contacto.

---

## 4. Quitar certificaciones que no se tienen

El sitio actualmente menciona que Global Dreamers está certificado en UK y Nueva Zelanda, pero **esas certificaciones no las tienen**. Esto es un riesgo serio porque las instituciones (CEF, migración) pueden entrar a verificar y exigir que se retire.

Acción: revisar el sitio completo y eliminar cualquier mención a certificaciones que no estén vigentes.

---

## 5. Pequeñas correcciones pendientes

Nathali mencionó que el sitio tiene "cositas que aún hay por corregir". Hay que hacer una pasada general y dejar todos los detalles afinados como parte de esta misma fase.

---

## Resumen del flujo deseado

1. Usuario llega al sitio (vía Google Ads, orgánico o redes)
2. Ve información general por destino con precios reales y completos
3. **Único call-to-action: el planner** (no hay WhatsApp ni teléfono visibles)
4. El planner le hace preguntas condicionales país por país
5. Si no califica → mensaje amable + PDF de orientación → fin del flujo
6. Si califica → desbloquea la agenda y agenda directamente la asesoría
7. Solo los perfiles ya filtrados llegan al equipo comercial

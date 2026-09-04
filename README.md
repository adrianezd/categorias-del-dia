# Categorías del Día

Un juego de palabras diario y gratuito en español, inspirado en el formato de "agrupar palabras en categorías ocultas" (el mismo tipo de mecánica genérica que ha hecho tan popular a los puzzles diarios estilo Wordle), pero con marca, diseño y contenido 100% originales.

**Jugar:** https://adrianezd.github.io/categorias-del-dia/

## Cómo funciona

Cada día aparecen 16 palabras que en secreto pertenecen a 4 grupos de 4. Selecciona 4 fichas y envíalas: si todas pertenecen a la misma categoría oculta, el grupo se revela con su nombre y un color según su dificultad (🟨 fácil, 🟩 medio, 🟦 difícil, 🟪 muy difícil, normalmente con un juego de palabras). Tienes 4 errores antes de que termine la partida. Si 3 de tus 4 palabras elegidas son correctas, el juego te avisa de que "estabas muy cerca".

## Características

- Puzzle diario determinista (mismo puzzle para todo el mundo, calculado por día UTC desde una fecha de referencia).
- Progreso del día persistido en `localStorage`, con recuperación si recargas la página.
- Estadísticas agregadas: partidas jugadas, % resueltas, racha actual y mejor racha.
- Archivo con todos los puzzles anteriores en modo práctica libre, sin afectar al progreso diario ni a las estadísticas.
- Tema claro / oscuro persistente.
- Resultado compartible en formato de emojis, copiado al portapapeles.
- Totalmente responsive, pensado primero para móvil (grid de 4×4, objetivos táctiles grandes, sin scroll horizontal).

## Stack

HTML, CSS y JavaScript vanilla. Sin frameworks, sin build step, sin dependencias de npm. El único recurso externo es la tipografía de Google Fonts.

## Estructura de archivos

- `index.html` — estructura y SEO (metadatos, Open Graph, JSON-LD `WebApplication` + `FAQPage`).
- `style.css` — estilos, mobile-first, temas claro/oscuro.
- `content.js` — banco de puzzles (contenido original, escrito a mano).
- `script.js` — lógica del juego, persistencia, estadísticas, archivo, temas.
- `favicon.svg`, `manifest.json`, `robots.txt`, `sitemap.xml` — metadatos del sitio.

## Licencia de contenido

Todo el contenido (puzzles, textos, marca) es original, escrito para este proyecto.

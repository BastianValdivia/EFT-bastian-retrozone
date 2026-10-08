# Bastian RetroZone — Tienda de Videojuegos (EFT)

Evaluación Final Transversal del curso Desarrollo Frontend I: sitio web para una tienda de venta de videojuegos online, desarrollado con **React + Vite** y **Bootstrap 5**.

Proyecto con fines académicos. No hay backend: el formulario de contacto valida los datos y simula el envío, y la compra del carrito también es simulada. No se manda ningún mensaje ni se procesa ningún pago real.

## Enlaces

- **Sitio publicado:** https://bastianvaldivia.github.io/EFT-bastian-retrozone/
- **Repositorio:** https://github.com/BastianValdivia/EFT-bastian-retrozone
- **Autor:** Bastián Andrés Valdivia Miranda

## Tecnologías

- [React 19](https://react.dev/) con [Vite](https://vitejs.dev/)
- Bootstrap 5 (instalado por npm)
- `fetch` + Hooks (`useState`, `useEffect`) para cargar datos, filtrar y manejar errores
- GitHub Pages para la publicación

## Cómo ejecutarlo en local

Requiere [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12 o superior).

```bash
npm install
npm run dev
```

Luego abrí http://localhost:5173/EFT-bastian-retrozone/ en el navegador (con la barra final). La ruta incluye el nombre del repositorio porque `vite.config.js` define `base: '/EFT-bastian-retrozone/'`, necesario para GitHub Pages.

Para generar la versión de producción: `npm run build` (el resultado queda en la carpeta `dist/`).

## Publicación en GitHub Pages

El sitio se publica desde la rama `gh-pages`, que contiene el contenido de la carpeta `dist/` generada con `npm run build`. En el repositorio, la opción **Settings → Pages** apunta a esa rama (`/ (root)`).

## Estructura del proyecto

```
EFT-bastian-retrozone/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── img/                       # 30 portadas, logo y favicon
│   ├── fonts/                     # Fuente Nasalization
│   └── data/
│       └── videojuegos.json       # Catálogo: 30 juegos, 6 categorías
└── src/
    ├── main.jsx                   # Punto de entrada
    ├── App.jsx                    # Estado central
    ├── index.css                  # Estilos propios
    └── components/
        ├── Navbar.jsx             # Navegación + ícono del carrito
        ├── CartDropdown.jsx       # Tabla del carrito y compra simulada
        ├── CategoryFilter.jsx     # Botones de filtro por categoría
        ├── GameList.jsx           # Catálogo de sugerencias
        ├── CommunitySection.jsx   # Sección "Comunidad" + modal
        ├── PublishGameModal.jsx   # Formulario para publicar un juego
        ├── ContactForm.jsx        # Formulario de contacto con validación
        └── Footer.jsx             # Pie de página
```

## Cómo se resolvió cada requisito de la pauta

| Requisito | Dónde / cómo |
|---|---|
| Página principal con productos en tarjetas (imagen, nombre, precio, descripción) | `GameList` |
| Barra de navegación entre secciones | `Navbar`, con anclas a Inicio, Catálogo, Comunidad y Contacto |
| Formulario de contacto con validación | `ContactForm`: valida nombre, formato de email y longitud del mensaje antes de "enviar" |
| HTML semántico, CSS, Bootstrap 5 responsivo | `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`; grid y navbar colapsable de Bootstrap |
| Objeto/arreglo JS con los videojuegos | `public/data/videojuegos.json`, cargado con `fetch` |
| Generar tarjetas dinámicamente | `.map()` sobre el estado `juegos` en `GameList` |
| Filtrado por categoría | `CategoryFilter` + `.filter()` en `App.jsx`. En "Todos" se muestran los primeros 10 juegos y un aviso indica que el resto aparece al filtrar por categoría |
| Componentes React divididos (lista + formulario) | `GameList` y `ContactForm`, cada uno con su responsabilidad |
| Props entre componentes | Ver tabla de componentes más abajo |
| **Estado para agregar o eliminar videojuegos de la lista** | Ver la sección "Sobre agregar y eliminar" más abajo |

### Sobre "agregar y eliminar videojuegos"

La pauta pide que el estado permita agregar y eliminar videojuegos de la lista. Decidimos **no** dejar que cualquier visitante agregue o elimine productos directamente del catálogo de la tienda, porque no sería realista en un e-commerce real. En cambio:

- **Eliminar:** cada card del catálogo tiene un botón "✕" (title: *"No me interesa esta sugerencia"*) que saca ese juego de la lista de sugerencias (`setJuegos` filtrando por id).
- **Agregar:** la sección "Comunidad" simula que desarrolladores freelance publican sus propios juegos a través de un modal (`PublishGameModal`), que agrega el juego nuevo a una lista aparte (`setJuegosComunidad`).

Ambas acciones usan exactamente el mismo mecanismo de React que pide la pauta (`useState` + agregar/quitar elementos de un arreglo sin mutarlo), aplicado sobre dos casos de uso distintos y más creíbles que dejar manipular el catálogo de la tienda a cualquier usuario.

### Carrito y compra simulada

Cada card tiene un botón "Agregar al carrito". El ícono de la barra de navegación muestra la cantidad de juegos agregados y abre un desplegable con la tabla del carrito, el total y un botón "Comprar". Como no hay backend, la compra es simulada: vacía el carrito y muestra un mensaje de confirmación con la cantidad de juegos y el total.

## Componentes y props

| Componente | Props | Qué hace |
|---|---|---|
| `Navbar` | `carrito`, `onEliminarDelCarrito`, `onComprar` | Navegación + ícono del carrito con contador; controla cuándo se muestra `CartDropdown` |
| `CartDropdown` | `items`, `onEliminar`, `onComprar` | Tabla del carrito, total y botón "Comprar" (compra simulada) |
| `CategoryFilter` | `categoriaActiva`, `onCambiarCategoria` | Botones de filtro |
| `GameList` | `juegos`, `onEliminar`, `onAgregarAlCarrito`, `idsEnCarrito` | Catálogo de sugerencias |
| `CommunitySection` | `juegosComunidad`, `onPublicar` | Lista de juegos publicados + botón que abre el modal |
| `PublishGameModal` | `onPublicar`, `onCerrar` | Formulario de publicación, con su propio estado y validación |
| `ContactForm` | — | Formulario de contacto, con su propio estado y validación |
| `Footer` | — | Pie de página con enlaces a las secciones |

`App.jsx` concentra el estado compartido (catálogo, categoría activa, carrito y juegos de la comunidad) y lo reparte a los componentes por props. Los eventos suben a `App` mediante funciones recibidas también por props.

## Renderizado condicional

- Mientras se cargan los videojuegos: "Cargando videojuegos...".
- Si falla la carga: mensaje de error.
- Vista "Todos": aviso de que se muestra solo una parte del catálogo.
- Catálogo filtrado sin resultados: mensaje acorde.
- Botón de cada card: "Agregar al carrito" o "✓ En el carrito" (deshabilitado), según corresponda.
- Carrito en el desplegable: vacío, con productos, o mensaje de "Compra realizada (simulada)" tras pulsar Comprar.
- Sección Comunidad: mensaje de "no hay publicaciones" vs. la grilla de juegos publicados.
- Modal de publicación: se muestra solo al pulsar "Publicar mi juego", con mensaje de error si faltan datos o la URL de la imagen no es válida.
- Formulario de contacto: errores por campo, y mensaje de éxito tras un envío válido.

## Accesibilidad

- `lang="es"`, jerarquía de títulos ordenada, `alt` en todas las imágenes.
- Botones icon-only con `aria-label` (quitar sugerencia, quitar del carrito, cerrar modal).
- `aria-pressed` en los botones de categoría activa, `aria-expanded` en el botón del carrito.
- Labels asociadas a cada campo de formulario (`htmlFor` + `id`).
- El modal y el carrito se cierran con la tecla Escape.
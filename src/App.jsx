import { useState, useEffect } from 'react';

import Navbar from './components/Navbar.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import GameList from './components/GameList.jsx';
import CommunitySection from './components/CommunitySection.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';

/**
 * App
 * Componente raíz. Centraliza todo el estado y lo reparte a los
 * hijos por props.
 */
function App() {
  // Catálogo principal, cargado por useEffect desde el JSON local.
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Filtro de categoría activo ("Todos" = sin filtrar).
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  // Carrito: juegos agregados desde el catálogo.
  const [carrito, setCarrito] = useState([]);

  // Juegos publicados por la comunidad (cubre el requisito de "agregar
  // videojuegos a la lista" con useState, ver CommunitySection.jsx).
  const [juegosComunidad, setJuegosComunidad] = useState([]);

  // Carga del catálogo. Fetch real sobre
  // un archivo en public/, usando BASE_URL para que funcione tanto en
  // local como una vez publicado en la subcarpeta de GitHub Pages.
  useEffect(() => {
    async function cargarJuegos() {
      try {
        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}data/videojuegos.json`
        );

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        const datosConRutasCompletas = datos.map((juego) => ({
          ...juego,
          imagen: `${import.meta.env.BASE_URL}${juego.imagen.replace(/^\/+/, '')}`,
        }));

        setJuegos(datosConRutasCompletas);
      } catch (error) {
        console.error('Error al cargar los videojuegos:', error);
        setError(
          'No se pudieron cargar los videojuegos en este momento. Por favor, intenta nuevamente más tarde.'
        );
      } finally {
        setCargando(false);
      }
    }

    cargarJuegos();
  }, []);

  // Catálogo filtrado por categoría. No necesita su propio estado:
  // se recalcula en cada render a partir de "juegos" y "categoriaActiva".
  //
  // En "Todos" se recortan a las primeras 10: como no hay paginación,
  // mostrar las 30 de una satura la pantalla. Cada categoría puntual
  // ya tiene como máximo 5, así que ahí no hace falta recortar nada.
  const juegosDeLaCategoria =
    categoriaActiva === 'Todos'
      ? juegos
      : juegos.filter((juego) => juego.categoria === categoriaActiva);

  const juegosFiltrados =
    categoriaActiva === 'Todos'
      ? juegosDeLaCategoria.slice(0, 10)
      : juegosDeLaCategoria;

  const hayMasJuegosSinMostrar =
    categoriaActiva === 'Todos' && juegosDeLaCategoria.length > 10;

  /**
   * Elimina un juego del catálogo de sugerencias (botón "✕" / "No me
   * interesa esta sugerencia"). Nunca mutamos el estado directamente:
   * filter() devuelve un arreglo nuevo sin ese juego.
   */
  function eliminarDeSugerencias(idJuego) {
    setJuegos(juegos.filter((juego) => juego.id !== idJuego));
  }

  /**
   * Agrega un juego al carrito.
   */
  function agregarAlCarrito(juego) {
    setCarrito([...carrito, juego]);
  }

  function eliminarDelCarrito(idJuego) {
    setCarrito(carrito.filter((item) => item.id !== idJuego));
  }

  /**
   * Compra simulada: no hay backend, así que "comprar" solo vacía el
   * carrito. El mensaje de confirmación lo muestra CartDropdown.
   */
  function comprarCarrito() {
    setCarrito([]);
  }

  /**
   * Agrega un juego nuevo a la lista de la comunidad (desde el modal
   * de CommunitySection). Esta es la acción de "agregar" de la pauta.
   */
  function publicarJuegoComunidad(juegoNuevo) {
    setJuegosComunidad([...juegosComunidad, juegoNuevo]);
  }

  return (
    <>
      <Navbar
      carrito={carrito}
      onEliminarDelCarrito={eliminarDelCarrito}
      onComprar={comprarCarrito}
      />

      <header id="inicio" className="header-bienvenida text-white text-center py-4 px-3">
        <h1 className="mb-2 titulo-principal">BASTIAN RETROZONE</h1>
        <p className="mb-0 px-3">
          Encontrá tu próximo videojuego favorito: filtrá por categoría,
          descubrí lo que publica la comunidad, y escribinos si tenés
          alguna duda.
        </p>
      </header>

      <main className="container my-4">
        <section id="catalogo">
          <h2 className="h4 mb-1">Selección basada en tus preferencias</h2>
          <p className="text-muted">
            Filtrá por categoría, o quitá una sugerencia si no te
            interesa.
          </p>

          <CategoryFilter
            categoriaActiva={categoriaActiva}
            onCambiarCategoria={setCategoriaActiva}
          />

          {/* Aviso de que "Todos" muestra un recorte, no el catálogo
              completo (no hay paginación en este proyecto). */}
          {hayMasJuegosSinMostrar && (
            <p className="text-muted small">
              Mostrando los primeros 10 de {juegosDeLaCategoria.length} juegos.
              Filtrá por categoría para ver el resto.
            </p>
          )}

          {/* Renderizado condicional según el estado de la carga */}
          {cargando && <p className="text-muted">Cargando videojuegos...</p>}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!cargando && !error && (
            <GameList
              juegos={juegosFiltrados}
              onEliminar={eliminarDeSugerencias}
              onAgregarAlCarrito={agregarAlCarrito}
              idsEnCarrito={carrito.map((item) => item.id)}
            />
          )}
        </section>

        <CommunitySection
          juegosComunidad={juegosComunidad}
          onPublicar={publicarJuegoComunidad}
        />

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

export default App;

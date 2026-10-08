import { useState, useEffect, useRef } from 'react';
import CartDropdown from './CartDropdown.jsx';

/**
 * Navbar
 * Barra de navegación con links a las secciones del sitio (ancla por
 * id, no React Router), menú responsive con Bootstrap y carrito.
 *
 * Props:
 *  - carrito: arreglo de juegos agregados.
 *  - onEliminarDelCarrito: función para sacar un juego del carrito.
 *  - onComprar: función que simula la compra y vacía el carrito.
 */
function Navbar({ carrito, onEliminarDelCarrito, onComprar }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const cantidadEnCarrito = carrito.length;

  // Ref al contenedor del botón + dropdown, para detectar clicks afuera.
  const contenedorCarritoRef = useRef(null);

  // Con el carrito abierto: Escape o un click fuera lo cierran.
  useEffect(() => {
    if (!mostrarCarrito) return;

    function manejarClickAfuera(evento) {
      if (
        contenedorCarritoRef.current &&
        !contenedorCarritoRef.current.contains(evento.target)
      ) {
        setMostrarCarrito(false);
      }
    }

    function manejarTecla(evento) {
      if (evento.key === 'Escape') {
        setMostrarCarrito(false);
      }
    }

    document.addEventListener('mousedown', manejarClickAfuera);
    document.addEventListener('keydown', manejarTecla);

    return () => {
      document.removeEventListener('mousedown', manejarClickAfuera);
      document.removeEventListener('keydown', manejarTecla);
    };
  }, [mostrarCarrito]);

  return (
    <nav
      aria-label="Navegación principal"
      className="navbar navbar-expand-lg navbar-dark navbar-retro border-top border-white sticky-top"
    >
      <div className="container-fluid">

        {/* Logo y nombre */}
        <span className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}img/logo-bastian.png`}
            alt=""
            width="28"
            height="28"
          />
          Bastian RetroZone
        </span>

        {/* Botón hamburguesa para pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex gap-3">
            <a className="nav-link text-white" href="#inicio">
              Inicio
            </a>

            <a className="nav-link text-white" href="#catalogo">
              Catálogo
            </a>

            <a className="nav-link text-white" href="#comunidad">
              Comunidad
            </a>

            <a className="nav-link text-white" href="#contacto">
              Contacto
            </a>
          </div>
        </div>

        {/* Carrito */}
        <div
          className="position-relative carrito-contenedor ms-auto mt-1"
          ref={contenedorCarritoRef}
        >
          <button
            type="button"
            className="btn btn-outline-light position-relative"
            onClick={() => setMostrarCarrito((valorActual) => !valorActual)}
            aria-expanded={mostrarCarrito}
            aria-label="Ver carrito"
          >
            🛒 Carrito

            <span className="badge bg-danger rounded-pill ms-1">
              {cantidadEnCarrito}
            </span>
          </button>

          {/* Dropdown del carrito */}
          {mostrarCarrito && (
            <CartDropdown
              items={carrito}
              onEliminar={onEliminarDelCarrito}
              onComprar={onComprar}
            />
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
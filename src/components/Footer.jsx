/**
 * Footer
 * Footer expandido: marca + 4 columnas (Tienda, Ayuda, Legal, Conectar)
 * y una fila final de copyright. La mayoría de los links son
 * ilustrativos (no hay páginas reales detrás, como "Política de
 * privacidad"), así que llevan preventDefault para no mover la
 * página; los que sí existen (Inicio, Catálogo, Comunidad, Contacto)
 * son anclas reales a sus secciones.
 *
 * Los íconos de redes son SVG simples e inline, para no depender de
 * ninguna librería de íconos externa.
 */
function Footer() {
  function manejarLinkIlustrativo(evento) {
    evento.preventDefault();
  }

  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5 border-top border-secondary">
      <div className="container">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img
            src={`${import.meta.env.BASE_URL}img/logo-bastian.png`}
            alt=""
            width="32"
            height="32"
          />
          <span className="fs-5 fw-bold">Bastian RetroZone</span>
        </div>

        <hr className="border-secondary" />

        <div className="row g-4">
          <div className="col-6 col-md-3">
            <h3 className="h6 text-uppercase text-white-50">Tienda</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#inicio" className="link-light link-opacity-75 text-decoration-none">
                  Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="#catalogo" className="link-light link-opacity-75 text-decoration-none">
                  Juegos sugeridos
                </a>
              </li>
              <li className="mb-2">
                <a href="#comunidad" className="link-light link-opacity-75 text-decoration-none">
                  Comunidad
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="h6 text-uppercase text-white-50">Ayuda</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#contacto" className="link-light link-opacity-75 text-decoration-none">
                  Contacto
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  onClick={manejarLinkIlustrativo}
                  className="link-light link-opacity-75 text-decoration-none"
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  onClick={manejarLinkIlustrativo}
                  className="link-light link-opacity-75 text-decoration-none"
                >
                  Política de reembolso
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="h6 text-uppercase text-white-50">Legal</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  onClick={manejarLinkIlustrativo}
                  className="link-light link-opacity-75 text-decoration-none"
                >
                  Términos de servicio
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  onClick={manejarLinkIlustrativo}
                  className="link-light link-opacity-75 text-decoration-none"
                >
                  Política de privacidad
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  onClick={manejarLinkIlustrativo}
                  className="link-light link-opacity-75 text-decoration-none"
                >
                  Clasificación por edad
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h3 className="h6 text-uppercase text-white-50">Conectar</h3>
            <div className="d-flex gap-3">
              <a
                href="#"
                onClick={manejarLinkIlustrativo}
                className="link-light"
                aria-label="Facebook (ilustrativo)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-2a1 1 0 0 1 1-1h2z" />
                </svg>
              </a>
              <a
                href="#"
                onClick={manejarLinkIlustrativo}
                className="link-light"
                aria-label="X / Twitter (ilustrativo)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </a>
              <a
                href="#"
                onClick={manejarLinkIlustrativo}
                className="link-light"
                aria-label="Instagram (ilustrativo)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                onClick={manejarLinkIlustrativo}
                className="link-light"
                aria-label="YouTube (ilustrativo)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="4" />
                  <path d="M10 9l6 3-6 3z" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center text-white-50 small mb-0">
          &copy; 2026 Bastian RetroZone. Proyecto académico, Desarrollo
          Frontend I.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

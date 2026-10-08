import { useState } from 'react';
import PublishGameModal from './PublishGameModal.jsx';

/**
 * CommunitySection
 * Cubre el requisito de "agregar videojuegos a la lista" con una
 * excusa de diseño: en vez de dejar que cualquier visitante agregue
 * productos al catálogo de la tienda (algo que no tendría sentido en
 * un e-commerce real), se simula una sección donde desarrolladores
 * freelance publican sus propios juegos. Cumple lo mismo pero con un caso de
 * uso creíble.
 *
 * Props:
 *  - juegosComunidad: arreglo de juegos publicados (App.jsx).
 *  - onPublicar: función para agregar un juego nuevo a ese arreglo.
 */
function CommunitySection({ juegosComunidad, onPublicar }) {
  const [mostrarModal, setMostrarModal] = useState(false);

  function manejarPublicar(juegoNuevo) {
    onPublicar(juegoNuevo);
    setMostrarModal(false);
  }

  return (
    <section id="comunidad" className="my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div>
          <h2 className="h4 mb-1">Comunidad</h2>
          <p className="text-muted mb-0">
            ¿Eres desarrollador? Publica tu videojuego y deja que la
            comunidad conozca tu trabajo.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setMostrarModal(true)}
        >
          Publicar mi juego
        </button>
      </div>

      {/* Renderizado condicional: estado vacío vs. con publicaciones */}
      {juegosComunidad.length === 0 ? (
        <p className="text-muted">
          Aún no hay juegos de la comunidad. ¡Sé el primero en publicar
          el tuyo!
        </p>
      ) : (
        <div className="row g-3">
          {juegosComunidad.map((juego) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={juego.id}>
              <div className="card h-100">
                <img
                  src={juego.imagen}
                  className="card-img-top"
                  loading="lazy"
                  alt={`Portada del videojuego ${juego.nombre}, publicado por la comunidad`}
                />
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-secondary align-self-start mb-2">
                    {juego.categoria}
                  </span>
                  <h3 className="h6 card-title">{juego.nombre}</h3>
                  <p className="card-text small flex-grow-1">
                    {juego.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarModal && (
        <PublishGameModal
          onPublicar={manejarPublicar}
          onCerrar={() => setMostrarModal(false)}
        />
      )}
    </section>
  );
}

export default CommunitySection;

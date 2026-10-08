import { useState } from 'react';

const CATEGORIAS_SELECCIONABLES = [
  'Accion',
  'Lucha',
  'Aventura',
  'Arcade',
  'Carreras',
  'Plataformas',
];

/**
 * PublishGameModal
 * Modal controlado enteramente con useState
 *
 * Tiene su propio estado para los campos del formulario y para los
 * errores de validación.
 *
 * Props:
 *  - onPublicar: función que recibe el juego nuevo ya validado.
 *  - onCerrar: función para cerrar el modal sin publicar.
 */
function PublishGameModal({ onPublicar, onCerrar }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS_SELECCIONABLES[0]);
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [error, setError] = useState('');

  function manejarSubmit(evento) {
    evento.preventDefault();

    if (!nombre.trim() || !descripcion.trim() || !imagen.trim()) {
      setError('Completá todos los campos antes de publicar.');
      return;
    }

    onPublicar({
      id: `comunidad-${Date.now()}`,
      nombre: nombre.trim(),
      categoria,
      descripcion: descripcion.trim(),
      imagen: imagen.trim(),
    });
  }

  return (
    <>
      {/*
        Usamos las clases reales de Bootstrap ("modal", "modal-backdrop")
        en vez de una clase propia: Bootstrap define el color de fondo,
        el borde y el radio de la tarjeta del modal como variables CSS
        (--bs-modal-bg, --bs-modal-border-color, etc.) declaradas en la
        clase ".modal". Si el contenedor no tiene esa clase, esas
        variables quedan sin definir y la tarjeta se ve transparente,
        sin fondo ni bordes — que es justo lo que pasaba antes.

        "d-block" reemplaza al JS de Bootstrap (que normalmente agrega
        esa clase al abrir el modal); nosotros la controlamos con nuestro
        propio useState en CommunitySection.jsx en vez de data-bs-toggle.
      */}
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        onClick={onCerrar}
      >
        {/* stopPropagation: clickear adentro del modal no debe cerrarlo,
            solo clickear el fondo oscuro de afuera. */}
        <div
          className="modal-dialog modal-dialog-centered"
          onClick={(evento) => evento.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5">Publicar tu videojuego</h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Cerrar"
                onClick={onCerrar}
              ></button>
            </div>

            <form onSubmit={manejarSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="nombre-juego" className="form-label">
                    Nombre del juego
                  </label>
                  <input
                    id="nombre-juego"
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="categoria-juego" className="form-label">
                    Categoría
                  </label>
                  <select
                    id="categoria-juego"
                    className="form-select"
                    value={categoria}
                    onChange={(evento) => setCategoria(evento.target.value)}
                  >
                    {CATEGORIAS_SELECCIONABLES.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="imagen-juego" className="form-label">
                    URL de la imagen de portada
                  </label>
                  <input
                    id="imagen-juego"
                    type="text"
                    className="form-control"
                    placeholder="https://..."
                    value={imagen}
                    onChange={(evento) => setImagen(evento.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcion-juego" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion-juego"
                    className="form-control"
                    rows="3"
                    value={descripcion}
                    onChange={(evento) => setDescripcion(evento.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCerrar}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* El fondo oscuro semitransparente: en Bootstrap es un elemento
          aparte (el JS lo agrega como hermano del modal, no adentro). */}
      <div className="modal-backdrop show"></div>
    </>
  );
}

export default PublishGameModal;

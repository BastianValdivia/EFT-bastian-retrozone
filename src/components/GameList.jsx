/**
 * GameList
 * El catálogo principal, bajo el título "Selección basada en tus
 * preferencias". Cada card tiene dos acciones independientes:
 *
 *  - Un botón "✕" en la esquina (con title "No me interesa esta
 *    sugerencia") que llama a onEliminar(id): saca el juego del
 *    estado "juegos" de App.jsx. Esto cubre el requisito de la pauta
 *    de "eliminar videojuegos de la lista" usando useState.
 *
 * Props:
 *  - juegos: catálogo ya filtrado por categoría (App.jsx hace el filtro).
 *  - onEliminar: saca un juego del catálogo (id).
 *  - onAgregarAlCarrito: agrega un juego al carrito (objeto producto).
 *  - idsEnCarrito: ids de los juegos ya agregados, para deshabilitar
 *    el botón y mostrar "✓ En el carrito" (renderizado condicional).
 */
function GameList({ juegos, onEliminar, onAgregarAlCarrito, idsEnCarrito }) {
  if (juegos.length === 0) {
    return (
      <p className="text-muted">
        No hay juegos en esta categoría (o ya quitaste todas las
        sugerencias).
      </p>
    );
  }

  return (
    <div className="row g-3">
      {juegos.map((juego) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={juego.id}>
          <div className="card h-100 position-relative">
            <button
              type="button"
              className="btn btn-sm btn-light position-absolute top-0 end-0 m-1 rounded-circle"
              title="No me interesa esta sugerencia"
              aria-label={`Quitar ${juego.nombre} de las sugerencias`}
              onClick={() => onEliminar(juego.id)}
            >
              ✕
            </button>

            <span className="badge bg-dark m-2 align-self-start">
              {juego.categoria}
            </span>
            <img
              src={juego.imagen}
              className="card-img-top"
              loading="lazy"
              alt={`Portada del videojuego ${juego.nombre}`}
            />
            <div className="card-body d-flex flex-column">
              <h3 className="h6 card-title">{juego.nombre}</h3>
              <p className="card-text small flex-grow-1">
                {juego.descripcion}
              </p>
              <p className="fw-bold">
                ${juego.precio.toLocaleString('es-CL')}
              </p>

              {/* Renderizado condicional: texto y estado del botón
                  según si el juego ya está en el carrito. */}
              {idsEnCarrito.includes(juego.id) ? (
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm mt-auto"
                  disabled
                >
                  ✓ En el carrito
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success btn-sm mt-auto"
                  onClick={() => onAgregarAlCarrito(juego)}
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GameList;

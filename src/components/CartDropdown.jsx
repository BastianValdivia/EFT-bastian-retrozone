import { useState } from 'react';

/**
 * CartDropdown
 * La tabla con el contenido del carrito. Navbar.jsx decide CUÁNDO se
 * muestra (con su propio useState); este componente solo se encarga
 * de CÓMO se ve el contenido.
 *
 * El botón "Comprar" simula la compra (no hay backend): le avisa a
 * App.jsx para que vacíe el carrito, y guarda acá un resumen
 * (cantidad y total) para mostrar la confirmación, ya que después de
 * comprar el carrito queda sin items.
 *
 * Props:
 *  - items: arreglo de juegos agregados al carrito.
 *  - onEliminar: función para sacar un juego del carrito por id.
 *  - onComprar: función que simula la compra y vacía el carrito.
 */
function CartDropdown({ items, onEliminar, onComprar }) {
  // null = no se compró nada; con valor = { cantidad, total } de la
  // última compra simulada.
  const [compra, setCompra] = useState(null);

  const total = items.reduce((acumulado, item) => acumulado + item.precio, 0);

  function manejarCompra() {
    setCompra({ cantidad: items.length, total });
    onComprar();
  }

  return (
    <div className="carrito-dropdown card shadow">
      <div className="card-body">
        {/* Renderizado condicional: carrito con contenido, compra
            recién realizada, o carrito vacío. */}
        {items.length > 0 ? (
          <>
            <table className="table table-sm align-middle mb-2">
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td className="text-end">
                      ${item.precio.toLocaleString('es-CL')}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onEliminar(item.id)}
                        aria-label={`Quitar ${item.nombre} del carrito`}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fw-bold text-end mb-2">
              Total: ${total.toLocaleString('es-CL')}
            </p>
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={manejarCompra}
            >
              Comprar
            </button>
          </>
        ) : compra ? (
          <div className="alert alert-success mb-0" role="status">
            <p className="fw-bold mb-1">Compra realizada (simulada)</p>
            <p className="mb-0 small">
              {compra.cantidad === 1 ? '1 juego' : `${compra.cantidad} juegos`}{' '}
              por ${compra.total.toLocaleString('es-CL')}. ¡Gracias por tu
              compra!
            </p>
          </div>
        ) : (
          <p className="text-muted mb-0">Todavía no agregaste ningún juego.</p>
        )}
      </div>
    </div>
  );
}

export default CartDropdown;
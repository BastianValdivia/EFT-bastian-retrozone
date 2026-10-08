const CATEGORIAS = [
  'Todos', // "Todos" no es una categoría real: es el filtro que no excluye nada.
  'Accion',
  'Lucha',
  'Aventura',
  'Arcade',
  'Carreras',
  'Plataformas',
];

// Solo para mostrar "Acción" con tilde en el botón, sin tener que
// cargar tildes en el valor que se compara contra producto.categoria.
const ETIQUETAS = {
  Accion: 'Acción',
};

/**
 * CategoryFilter
 * Props:
 *  - categoriaActiva: la categoría seleccionada actualmente.
 *  - onCambiarCategoria: función que App.jsx pasa para actualizar
 *    categoriaActiva cuando se hace click en un botón.
 */
function CategoryFilter({ categoriaActiva, onCambiarCategoria }) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar por categoría">
      {CATEGORIAS.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`btn btn-categoria btn-sm ${
            categoria === categoriaActiva ? 'btn-primary active' : 'btn-outline-primary'
          }`}
          onClick={() => onCambiarCategoria(categoria)}
          aria-pressed={categoria === categoriaActiva}
        >
          {ETIQUETAS[categoria] || categoria}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;

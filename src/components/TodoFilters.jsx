// Composant : boutons de filtre

function TodoFilters({ filter, setFilter }) {
  const filters = [
    { key: 'all', label: 'Toutes' },
    { key: 'active', label: 'Actives' },
    { key: 'completed', label: 'Terminées' }
  ]

  return (
    <div className="filters-container">
      {filters.map(f => (
        <button
          key={f.key}
          className={`filter-btn ${filter === f.key ? 'active' : ''}`}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default TodoFilters
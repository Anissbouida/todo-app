// App.jsx - Maintenant avec gestion du chargement et des erreurs

import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoFilters from './components/TodoFilters'
import TodoList from './components/TodoList'

import './styles/variables.css'
import './styles/animations.css'
import './styles/components.css'

function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount,
    loading,
    error,
    reload
  } = useTodos()

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">✅ Mes Tâches</h1>
        <p className="app-subtitle">Organisez votre journée efficacement</p>
      </header>

      {/* Afficher l'erreur si présente */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={reload}>Réessayer</button>
        </div>
      )}

      <TodoInput onAdd={addTodo} />
      
      <TodoFilters filter={filter} setFilter={setFilter} />
      
      {/* Afficher le chargement ou la liste */}
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Chargement des tâches...</p>
        </div>
      ) : (
        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
      )}

      <footer className="app-footer">
        <span className="todo-count">
          {activeCount} tâche{activeCount !== 1 ? 's' : ''} restante{activeCount !== 1 ? 's' : ''}
        </span>
        
        {completedCount > 0 && (
          <button 
            className="clear-completed-btn"
            onClick={clearCompleted}
          >
            Effacer terminées ({completedCount})
          </button>
        )}
      </footer>
    </div>
  )
}

export default App
// Composant : une seule tâche

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div 
        className="todo-checkbox"
        onClick={() => onToggle(todo.id)}
      >
        <span className="todo-checkbox-icon">✓</span>
      </div>
      
      <span className="todo-text">{todo.text}</span>
      
      <button 
        className="todo-delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
// Composant : liste des tâches

import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>🎉 Aucune tâche à afficher</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
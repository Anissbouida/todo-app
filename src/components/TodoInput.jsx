// Composant : champ de saisie pour ajouter un todo

import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <form className="todo-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Qu'est-ce que tu dois faire ?"
      />
      <button type="submit" className="todo-add-btn">
        Ajouter
      </button>
    </form>
  )
}

export default TodoInput
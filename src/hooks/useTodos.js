// Hook personnalisé - maintenant connecté à l'API !

import { useState, useEffect } from 'react'
import * as api from '../services/api'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)  // Nouveau: état de chargement
  const [error, setError] = useState(null)      // Nouveau: gestion des erreurs

  // ============================================
  // CHARGER LES TODOS AU DÉMARRAGE
  // ============================================
  
  // useEffect = exécute du code quand le composant se charge
  useEffect(() => {
    loadTodos()
  }, [])  // [] = exécuter une seule fois au démarrage

  const loadTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api.fetchTodos()
      setTodos(data)
    } catch (err) {
      setError('Impossible de charger les tâches. Le serveur est-il démarré ?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ============================================
  // ACTIONS
  // ============================================

  const addTodo = async (text) => {
    if (text.trim() === '') return
    
    try {
      const newTodo = await api.createTodo(text)
      setTodos(prevTodos => [...prevTodos, newTodo])
    } catch (err) {
      setError('Erreur lors de l\'ajout de la tâche')
      console.error(err)
    }
  }

  const toggleTodo = async (id) => {
    try {
      // Trouve le todo actuel
      const todo = todos.find(t => t.id === id)
      if (!todo) return
      
      // Envoie la mise à jour au serveur
      const updated = await api.updateTodo(id, { completed: !todo.completed })
      
      // Met à jour l'état local
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === id ? updated : t)
      )
    } catch (err) {
      setError('Erreur lors de la modification')
      console.error(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id)
      setTodos(prevTodos => prevTodos.filter(t => t.id !== id))
    } catch (err) {
      setError('Erreur lors de la suppression')
      console.error(err)
    }
  }

  const clearCompleted = async () => {
    try {
      await api.clearCompletedTodos()
      setTodos(prevTodos => prevTodos.filter(t => !t.completed))
    } catch (err) {
      setError('Erreur lors de la suppression')
      console.error(err)
    }
  }

  // ============================================
  // FILTRES ET COMPTEURS
  // ============================================

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount,
    loading,    // Nouveau
    error,      // Nouveau
    reload: loadTodos  // Nouveau: permet de recharger manuellement
  }
}
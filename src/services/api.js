// api.js - Toutes les communications avec le backend
// Centraliser les appels API = bonne pratique pro

const API_URL = 'https://todo-backend-production-cfb7.up.railway.app/api'

// ============================================
// FONCTIONS API
// ============================================

// Récupérer tous les todos
export async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`)
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des tâches')
  }
  
  return response.json()
}

// Créer un nouveau todo
export async function createTodo(text) {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // Dit au serveur qu'on envoie du JSON
    },
    body: JSON.stringify({ text })  // Convertit l'objet en JSON
  })
  
  if (!response.ok) {
    throw new Error('Erreur lors de la création de la tâche')
  }
  
  return response.json()
}

// Modifier un todo (toggle completed ou changer le texte)
export async function updateTodo(id, updates) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
  
  if (!response.ok) {
    throw new Error('Erreur lors de la modification de la tâche')
  }
  
  return response.json()
}

// Supprimer un todo
export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la tâche')
  }
  
  return response.json()
}

// Supprimer tous les todos complétés
export async function clearCompletedTodos() {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'DELETE'
  })
  
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression des tâches')
  }
  
  return response.json()
}
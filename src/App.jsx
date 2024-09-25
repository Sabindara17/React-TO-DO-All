import { useState } from 'react'
import './app.css'

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    
    // Prevent adding empty items
    if (newItem.trim() === "") return

    setTodos(currentTodos => [
      ...currentTodos, 
      { id: crypto.randomUUID(), title: newItem.trim(), completed: false },
    ])
    setNewItem("")  // Clear input after submission
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos(currentTodos => 
      currentTodos.filter(todo => todo.id !== id)
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor='item'>New Item</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
            placeholder="Enter a new task"
          />
        </div>
        <button className='btn' disabled={!newItem.trim()}>Add</button>
      </form>
      
      <h1 className='header'>Todo List</h1>
      
      <ul className='list'>
        {todos.length === 0 ? (
          <p>No items yet</p>
        ) : (
          todos.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className='btn btn-danger'
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </>
  )
}

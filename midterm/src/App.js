import {useState, useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import Toast from './components/Toast'
import MotivationalMessages from './components/MotivationalMessages'
import './styles.css'

const App = () => {
  const [todos, setTodos] = useState([])
  const [toasts, setToasts] = useState([])
  const {getRandomMessage} = MotivationalMessages()

  const createTodo = (title, priority) => {
    const updatedTodos = [
      ...todos,
      {
        id: Math.round(Math.random() * 9999999),
        title,
        priority: parseInt(priority),
        completed: false,
      },
    ]
    setTodos(updatedTodos)
  }

  const deleteTodoById = (id) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(updatedTodos)
  }

  const editTodoById = (id, newTitle, newPriority) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, title: newTitle, priority: parseInt(newPriority)}
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const toggleCompleteById = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const addToast = (message) => {
    setToasts((prevToasts) => [...prevToasts, message]) 
  }

  const removeToast = (index) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index))
  }

  useEffect(() => {
    const reminderInterval = setInterval(() => {
      const top3Tasks = [...todos]
        .sort((a, b) => a.priority - b.priority)
        .filter((todo) => !todo.completed)
        .slice(0, 3)

      if (top3Tasks.length > 0) {
        top3Tasks.forEach((task, index) => {
          const reminderMessage = `Reminder! Task ${index + 1}: ${
            task.title} is incomplete! ${getRandomMessage()}`
          addToast(reminderMessage)
        })
      }
    }, 1000 * 60 * 60 * 2) // every 2 hours

    return () => clearInterval(reminderInterval)
  }, [todos])

  return (
    <div>
      <TodoCreate onCreate={createTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodoById}
        onEdit={editTodoById}
        onToggleComplete={toggleCompleteById}
      />

      <div className="toast-container-wrapper">
        {toasts.map((message, index) => (
          <Toast
            key={index}
            message={message}
            onClose={() => removeToast(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App

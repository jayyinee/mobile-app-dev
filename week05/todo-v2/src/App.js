import {useState, useEffect} from 'react'
import axios from 'axios'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3001/todos')
    setTodos(response.data)
  }
  //  useEffect (() => {})- no second argument: fires every the component (re)render

  // useEffect(() => {}, []) - []: fires the first time the component renders
  // useEffect(() => {}, []) - [counter]: fire on first render and every time variable counter render
  useEffect(() => {
    fetchTodos()
  }, [])

  const createTodo = async (title) => {
    const response = await axios.post('http://localhost:3001/todos', {
      title})
    const updatedTodos = [...todos, response.data]
    setTodos(updatedTodos)
  }

  const editTodoById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/todos/${id}`, {
      title: newTitle,
    })

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, ...response.data}
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`)
    
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(updatedTodos)
  }
  
  return (
    <div>
      <TodoCreate onCreate={createTodo} />
      <TodoList todos={todos} onDelete={deleteTodoById} onEdit={editTodoById} />
    </div>
  )
}

export default App

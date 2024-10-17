import {useState, useEffect} from 'react'

const TodoEdit = (props) => {
  const {todo, onSubmit} = props
  const [title, setTitle] = useState(todo.title)
  const [priority, setPriority] = useState(todo.priority)

  useEffect(() => {
    setTitle(todo.title)
    setPriority(todo.priority)
  }, [todo])

  const handlePriorityChange = (event) => {
    setPriority(event.target.value)
  }

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(todo.id, title, priority)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input class="title" type="text" onChange={handleChange} value={title} />

      <label>Priority:</label>
      <input
        class="priority"
        type="number"
        onChange={handlePriorityChange}
        value={priority}
        min="1"
      />

      <button>Update</button>
    </form>
  )
}

export default TodoEdit

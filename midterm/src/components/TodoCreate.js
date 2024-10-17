import {useState} from 'react'

const TodoCreate = (props) => {
  const {onCreate} = props
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(1) // default to 1 being most important

  const handlePriorityChange = (event) => {
    setPriority(event.target.value)
  }

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title, priority)
    setTitle('')
    setPriority((prevPriority) => parseInt(prevPriority) + 1)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input class="title" type="text" onChange={handleChange} value={title} />

      <label>Priority:</label>
      <input class="priority" type="number" onChange={handlePriorityChange} value={priority} min="1" />

      <button>Add</button>
    </form>
  )
}

export default TodoCreate

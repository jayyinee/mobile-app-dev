import {useState} from 'react'

const TodoCreate = (props) => {
  const {onCreate} = props
  const [title, setTitle] = useState('')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title: </label>
      <input type="text" onChange={handleChange} value={title} />
      <button>Add Todo</button>
    </form>
  )
}

export default TodoCreate

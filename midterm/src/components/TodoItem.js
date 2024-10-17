import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onToggleComplete} = props
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    onDelete(todo.id)
  }

  const handleEdit = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle, newPriority) => {
    onEdit(id, newTitle, newPriority)
    setShowEdit(false)
 }

 const handleToggleComplete = () => {
   onToggleComplete(todo.id)
 }

  let content = <h3>{todo.title}</h3>
  if (showEdit) {
    content = <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div class="todo-item">
      <div class="todo-content">
        <div
          class={`toggle-complete ${todo.completed ? 'completed' : ''}`} // Apply completed class based on state
          onClick={handleToggleComplete}
        ></div>
        {content}
      </div>
      {!showEdit && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default TodoItem

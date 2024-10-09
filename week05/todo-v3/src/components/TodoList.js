import {useContext} from 'react'
import TodoContext from '../context/Todo'

import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete, onEdit} = props
  const message = useContext(TodoContext)
  const renderedContent = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
  ))
  return (
    <div>
      <h1>{message}</h1>
      {renderedContent}
    </div>
  )
}

export default TodoList

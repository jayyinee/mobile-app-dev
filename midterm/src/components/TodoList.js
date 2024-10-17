import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete, onEdit, onToggleComplete} = props

  // sort in ascending order, priority 1 is highest
  const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority)

  const renderedTodos = sortedTodos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onDelete={onDelete}
      onEdit={onEdit}
      onToggleComplete={onToggleComplete}
    />
  ))

  return <div>{renderedTodos}</div>
}

export default TodoList

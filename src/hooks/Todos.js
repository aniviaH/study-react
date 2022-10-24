import { useState } from "react";
import useReducer, {todosReducer} from "./useReducer"

export function Todos () {
  const [todo, setTodo] = useState('');

  const [todos, dispatch] = useReducer(todosReducer, [])

  const [id, setId] = useState(1)

  function handleAddClick(text) {
    dispatch({
      type: 'add',
      text: todo,
      id: id
    })

    setId(id + 1)
  }

  return (
    <>
      <h3>自定义hook useReducer</h3>
      <input placeholder="add todo" value={todo} onChange={e => setTodo(e.target.value)}></input>
      <button onClick={handleAddClick}>add todo</button>
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>{todo.text} conpleted: {todo.completed ? 'true' : 'false'}</li>
          ))
        }
      </ul>

      <p>---------------------------------------------</p>
    </>
  )
}
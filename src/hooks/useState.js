import React, { useEffect, useState } from "react";

export function ExampleUseState () {
  const [count, setCount] = useState(0)
  const onClick = () => {
    setCount(count + 1)
  }

  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`
  })
  return (
    <div>
      <p>{count}</p>
      <button onClick={onClick}>click me</button>

      <p>age: {age}</p>
      <p>fruit: {fruit}</p>
      <p>todos: {todos[0].text}</p>
    </div>
  )
}

export class ClassExampleUseState extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <div>
        <p>You Clicked {this.state.count} times</p>
        <button onClick={() => this.setState({count: this.state.count + 1})}>click me</button>
      </div>
    )
  }
}
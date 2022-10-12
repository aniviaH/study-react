import React, { useEffect, useState } from "react";

const setCountArr = []
const effectArr = []

export function ExampleUseState () {
  console.log('ExampleUseState------render---')

  const [count, setCount] = useState(0)
  const onClick = () => {
    setCount(count + 1)
  }

  setCountArr.push(setCount)
  console.log('setCountArr---', setCountArr)
  if (setCountArr.length >= 2) {
    console.log(setCountArr[0] === setCountArr[1]) // true -> 每次渲染, state hook的更新函数都是同一个
  }

  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  // 相当于 componentDidMount 和 componentDidUpdate:
  const effect = () => {
    console.log('effect---new count:', count)
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`

    return () => {
      console.log('effect---clear---old count', count) // effect hook中返回的清除函数会在组件卸载的时候执行清除操作（effect 的清除阶段在每次重新渲染时都会执行）
    }
  }
  useEffect(effect)

  effectArr.push(effect)
  console.log('effectArr---', effectArr)
  if (effectArr.length >= 2) {
    console.log(effectArr[0] === effectArr[1]) // false -> 每次渲染, effect hook的effect函数都不同
  }


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

  componentDidMount () {
    console.log('ClassExampleUseState---componentDidMount---')
    document.title = `You clicked ${this.state.count} times`
  }
  componentDidUpdate () {
    console.log('ClassExampleUseState---componentDidUpdate---')
    document.title = `You clicked ${this.state.count} times`
  }

  componentWillUnmount () {
    console.log('ClassExampleUseState---componentWillUnmount---')
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
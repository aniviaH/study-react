import React, { useEffect, useState, useReducer } from "react";

const setCountArr = []
const effectArr = []

export function ExampleUseState () {
  console.log('ExampleUseState------render---')

  const [count, setCount] = useState(0)

  if (count > 2) {
    /**
     * Hook 规则
     * 1.只在最顶层使用 Hook 不要在循环，条件或嵌套函数中调用 Hook
     * 2.只在 React 函数中调用 Hook 不要在普通的 JavaScript 函数中调用 Hook。
     * -✅ 在 React 的函数组件中调用 Hook
     * -✅ 在自定义 Hook 中调用其他 Hook (我们将会在下一页 中学习这个。)
     */
    /**
      使用 eslint-plugin-react-hooks ESLint 插件来强制执行上面两条hook的规则
      .eslintrc.js
      "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
      "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
    */

    // React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.
    // const [count2, setCoun2] = useState(0)
    
    // React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render.
    // useEffect(() => {
    //   console.log('test---useEffect---')
    // })
  }

  const onClick = () => {
    setCount(count + 1)

    localStorage.setItem('MY-REACT-APP---click-count', count)
  }

  setCountArr.push(setCount)
  console.log('setCountArr---', setCountArr)
  if (setCountArr.length >= 2) {
    console.log(setCountArr[0] === setCountArr[1]) // true -> 每次渲染, state hook的更新函数都是同一个
  }

  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  // 被 effect hook调用的函数，挪到hook函数里去
  // The 'logFruit' function makes the dependencies of useEffect Hook (at line 80) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'logFruit' in its own useCallback() Hook.
  // function logFruit () {
  //   console.log('fruit---', fruit)
  // }

  // 相当于 componentDidMount 和 componentDidUpdate:
  const effect = () => {
    console.log('effect---new count:', count)
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`

    function logFruit () {
      console.log('fruit---', fruit)
    }

    if (count > 2) {
      console.log('count is greater than 2---')
      console.log('age---', age)
    } else if (count < 2) {
      console.log('count is less than 2---')
      logFruit()
    } else {
      console.log('count is equal to 2---')
    }

    return () => {
      console.log('effect---clear---old count', count) // effect hook中返回的清除函数会在组件卸载的时候执行清除操作（effect 的清除阶段在每次重新渲染时都会执行）
    }
  }
  useEffect(effect, [count, age, fruit]) // eslint校验 "react-hooks/exhaustive-deps": "warn" // eslint-plugin-react-hooks 检查 effect 的依赖

  effectArr.push(effect)
  console.log('effectArr---', effectArr)
  if (effectArr.length >= 2) {
    console.log(effectArr[0] === effectArr[1]) // false -> 每次渲染, effect hook的effect函数都不同
  }


  return (
    <div>
      <h3>内置hook useState</h3>
      <div>count: {count}</div>
      <button onClick={onClick}>click me</button>

      <p>age: {age}</p>
      <p>fruit: {fruit}</p>
      <p>todos: {todos[0].text}</p>

      <p>---------------------------------------------</p>
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
        <h3>内置hook useState</h3>
        <div>You Clicked {this.state.count} times</div>
        <button onClick={() => this.setState({count: this.state.count + 1})}>click me</button>
        <p>---------------------------------------------</p>
      </div>
    )
  }
}

export function ExampleUseReducer({initailCount = 100}) {
  const initialState = {count: 0}
  function init (initailCount) {
    debugger
    return {
      count: initailCount
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1}
      case 'decrement':
        return {count: state.count - 1}
      case 'reset':
        return init(action.payload)
      default:
        return new Error()
    }
  }

  // const [state, dispatch] = useReducer(reducer, initialState)

  /* 
    惰性初始化
    你可以选择惰性地创建初始 state。为此，需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)。
    这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利：
   */
  const [state, dispatch] = useReducer(reducer, initailCount, init)
  return (
    <>
      <h3>内置hook useReducer</h3>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'reset', payload: initailCount})}>Reset</button>
      <p>---------------------------------------------</p>
    </>
  )
}
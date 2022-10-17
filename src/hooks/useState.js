import React, { useEffect, useState } from "react";

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
      <p>{count}</p>
      <button onClick={onClick}>click me</button>

      <p>age: {age}</p>
      <p>fruit: {fruit}</p>
      <p>todos: {todos[0].text}</p>

      <p>
        <a href="https://baidu.com">百度</a>
      </p>
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
        <p>---------------------------</p>
      </div>
    )
  }
}
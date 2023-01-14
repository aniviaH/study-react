import {createContext, useContext, useMemo, useState} from 'react'

// 1. 调用 React.createContext 方法创建 Context 对象，如 MyContext ：
const MyContext = createContext("没有用的初始值")

// 2. 在组件 JSX 中使用 组件，定义 value 值，并将子组件声明在前者的闭合标签里：
function MyComponent1 () {
  const [state1, setState1] = useState('文本')
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setState1('更新文本')
  }
  const handleAddCount = () => {
    setCount(count+1)
    // setCount 更新count, 当前组件重新渲染，使用 Context value 的 MyGrandchildComponent组件重新渲染是正常的，未使用Context value值的 MyChildComponent 不重新渲染，也是正常的
  }

  return (
    <MyContext.Provider value={state1}>
      <ul>
        <MyChildComponent />
        <li>
          <button onClick={handleClick}>更新state</button>
        </li>
        <li><button onClick={handleAddCount}>add count {count}</button></li>
      </ul>
    </MyContext.Provider>
  )
}

// 3. 在子组件或后代组件中使用 useContext Hook 获取 MyContext 的值，这个组件就成为 MyContext 的消费者（Consumer）：
function MyChildComponent () {
  console.log('MyChildComponent渲染了---');
  return (
    <MyGrandchildComponent />
  )
}

function MyGrandchildComponent () {
  console.log('MyGrandchildComponent---');
  const value = useContext(MyContext)
  console.log('Context.Provider value: ', value)
  return (
    <li>{value}</li>
  )
}

// 其中MyContext.Provider 是可以嵌套使用的。MyGrandchildComponent 组件会去到组件树，从它的祖先节点中找到离它最近的 MyContext.Provider 即 MyComponent ，读取后者的 value 值；当 MyComponent 的 state1 ，也就是 MyContext.Provider 的 value 值发生更改时，会通知到它后代组件中所有消费者组件重新渲染。

// Context.Provider 的 value 值也可以传一个对象进去，但要注意写法，避免在组件重新渲染时反复创建新的对象，比如利用 state 或 useMemo ：

function MyChildComponentForObj () {
  console.log('MyChildComponentForObj渲染了---')
  return (
    <MyGrandchildComponentForObj />
  )
}

function MyGrandchildComponentForObj () {
  console.log('MyGrandchildComponentForObj渲染了---')
  const value = useContext(MyContext)
  console.log('Context.Provider value: ', value)
  return (
    <li>{value.key1}</li>
  )
}

// !!! 不要这样写
function MyComponent2 () {
  const [state1, setState1] = useState('文本')
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setState1('更新文本')
  }
  const handleAddCount = () => {
    setCount(count+1)
    // setCount 更新count, 当前组件重新渲染，每次重新生成提供value对象，使用 Context value 的 MyGrandchildComponent组件重新渲染是正常的，未使用Context value值的 MyChildComponent 也重新渲染，是多余的
  }

  return (
    <MyContext.Provider value={{key1: state1}}>
      <ul>
        <MyChildComponentForObj />
        <li>
          <button onClick={handleClick}>更新state</button>
        </li>
        <li><button onClick={handleAddCount}>add count {count}</button></li>
      </ul>
    </MyContext.Provider>
  )
}

function MyComponent3 () {
  const [obj, setObj] = useState({key1: '文本'})
  const handleClick = () => {
    setObj({key1: '更新文本'})
  }

  return (
    <MyContext.Provider value={obj}>
      <ul>
        <MyChildComponentForObj />
        <li>
          <button onClick={handleClick}>更新state</button>
        </li>
      </ul>
    </MyContext.Provider>
  )
}

function MyComponent4 () {
  const [state1, setState1] = useState('文本')
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setState1('更新文本')
  }

  const obj = useMemo(() => ({key1: state1}), [state1])

  const handleAddCount = () => {
    setCount(count+1)
    // setCount 更新count, 当前组件重新渲染，每次重新生成提供value对象，使用 Context value 的 MyGrandchildComponent组件重新渲染是正常的，未使用Context value值的 MyChildComponent 也重新渲染，是多余的
  }

  return (
    <MyContext.Provider value={obj}>
      <ul>
        <MyChildComponentForObj />
        <li>
          <button onClick={handleClick}>更新state</button>
        </li>
        <li><button onClick={handleAddCount}>add count {count}</button></li>
      </ul>
    </MyContext.Provider>
  )
}

// export default MyComponent1
// export default MyComponent2
// export default MyComponent3
export default MyComponent4
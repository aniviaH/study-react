import { useCallback, useState } from 'react'

// let currentState
let isFirst = true

// 让多次调用useState 不要去共享同一份数据
// let memorizedState = {
//   state: null,
//   next: null,
//   isFirst: true
// }
const currentStateArr = [
  // {}, // 0
  // {}, // helloworld
]
let callIndex // 代表当前到第几个hook了

// 第一次是0 那我dispatch的时候就要稳稳的找到0这个人
// 第二次是helloworld 那我dispatch的时候就要稳稳的找到1

export function myUseState(initialState) {
  if (callIndex === undefined) {
    // 第二次helloworld进来的时候已经callIndex === 0
    callIndex = 0
  }
  // else {
  //   callIndex++
  // }
  if (currentStateArr[callIndex]) {
    // 当前state已经有值，更新阶段
  } else {
    // 全局一个useState都没有调用过
    currentStateArr.push({
      isFirst: false,
      state: typeof initialState === 'function' ? initialState() : initialState,
    })
  }

  // currentState -> undefined
  // isFirst -> true
  // inititialState -> 0
  // currentState 立即被赋值为了0

  // currentState -> 0
  // isFirst -> false

  // if (isFirst) { // 但是useState() 是可以传undefined
  //   currentState = typeof initialState === 'function' ? initialState() : initialState;
  //   isFirst = false
  // }

  // 修改状态
  // 定义修改状态的函数
  const dispatchState = (() => {
    let _callIndex = callIndex // 很关键 // 永久的这个_callIndex=0
    return (newState) => {
      // 需要修正callIndex(外部的index)
      // callIndex = _callIndex // 更新时候 将callIndex设置为当前state的_callIndex(内部index)
      callIndex = 0 // 更新时候 将callIndex设置为当前state的_callIndex(内部index)

      // 实际上就是修改currentState的值
      console.log('修改前currentState', currentStateArr[_callIndex])
      const prevState = currentStateArr[_callIndex].state

      currentStateArr[_callIndex].state =
        typeof newState === 'function' ? newState(prevState) : newState
      console.log('修改后currentState', currentStateArr[_callIndex])
      window.render()
    }
  })()

  // callIndex 0
  console.log('currentStateArr', currentStateArr)
  console.log(
    'currentStateArr[callIndex]',
    currentStateArr[callIndex],
    currentStateArr[callIndex].state
  )
  const matchValue = currentStateArr[callIndex++] // 稳稳的拿到callIndex 0的对象 // 只不过当这段代码走完以后 callIndex变为1
  return [matchValue.state, dispatchState]
}

// 首次渲染完之后 callIndex 来到1

// 因为我们点击了increase以后会导致页面的重新渲染

export default function MyUseState() {
  // const [count, setCount] = useState(0)
  const [myCount, setMyCount] = myUseState(0)
  const [words, setWords] = myUseState('helloworld')

  // console.log('myCount', myCount, 'count', count)
  console.log('重新渲染：myCount', myCount)

  const increase = useCallback(() => {
    // setCount(prev => prev + 1)

    // 0 1
    setMyCount((prev) => prev + 1)
  }, [setMyCount])

  const decrease = useCallback(() => {
    // setCount(prev => prev - 1)
    setMyCount((prev) => prev - 1)
  }, [setMyCount])

  const changeWords = useCallback(() => {
    setWords((prev) => Math.random())
  }, [setWords])

  return (
    <div>
      <h1>手写useState</h1>
      {/* <span>count: {count}</span> */}
      <span>myCount: {myCount}</span>{' '}
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <span>words: {words}</span>
      <button onClick={changeWords}>change wordds</button>
    </div>
  )
}

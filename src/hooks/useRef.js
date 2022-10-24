import { useCallback, useRef, useState } from "react";

export function TextInputWithFocusButton() {
  const inputEle = useRef(null)
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEle.current.focus()
  }
  return (
    <>
      <h3>内置hook useRef</h3>
      <input ref={inputEle} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}

// callback ref
export function MeasureExample() {
  const [height, setHeight] = useState(0)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])

  return (
    <>
      <h1 ref={measuredRef}>callback ref</h1>
      <h2>The  above  header is {Math.round(height)}px tall</h2>
    </>
  )
}

/* 
在这个案例中，我们没有选择使用 useRef，因为当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。使用 callback ref 可以确保 即便子组件延迟显示被测量的节点 (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。
注意到我们传递了 [] 作为 useCallback 的依赖列表。这确保了 ref callback 不会在再次渲染时改变，因此 React 不会在非必要的时候调用它。
在此示例中，当且仅当组件挂载和卸载时，callback ref 才会被调用，因为渲染的 <h1> 组件在整个重新渲染期间始终存在。如果你希望在每次组件调整大小时都收到通知，则可能需要使用 ResizeObserver 或基于其构建的第三方 Hook。
 */

// 可以 把上面这个逻辑抽取出来作为 一个可复用的 Hook:
export function MeasureExample2() {
  const [rect, ref] = useClientRect()
  return (
    <>
      <h1 ref={ref}>callback ref</h1>
      {
        rect !== null && 
        <h2>The  above  header is {Math.round(rect.height)}px tall</h2>
      }
      <p>---------------------------------------------</p>
    </>
  )
}

function useClientRect () {
  const [rect, setRect] = useState(null)

  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return [rect, ref]
}
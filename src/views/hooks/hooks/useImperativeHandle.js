import { useEffect, useImperativeHandle, forwardRef, useRef } from 'react'

function FancyInput(props, ref) {
  console.log('FancyInput---', props, ref)
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log('focus函数被父组件手动触发, ref: ', ref, inputRef)
      inputRef.current.focus()
    },
  }))

  return <input ref={inputRef} />
}
FancyInput = forwardRef(FancyInput)

export function ExampleUseImperativeHandle() {
  const inputRef = useRef()
  useEffect(() => {})
  const handleFocusFancyInput = () => {
    inputRef.current.focus()
  }

  return (
    <>
      <p>---------------------------------------------</p>
      <h3>内置hook useImperativeHandle</h3>

      <button onClick={handleFocusFancyInput}>点击聚焦子组件里的输入框</button>

      <FancyInput ref={inputRef}></FancyInput>
    </>
  )
}

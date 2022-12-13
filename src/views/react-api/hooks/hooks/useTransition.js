import { useRef, useState, useTransition } from 'react'

export function ExampleUseTransition() {
  console.log('ExampleUseTransition---')
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0)
  const inputRef = useRef(null)

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1)

      // inputRef.current.focus()
    })
    // setCount(c => c + 1)
  }

  return (
    <div>
      <p>---------------------------------------------</p>
      <h3>内置hook useTransition</h3>

      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>

      <input ref={inputRef}></input>
    </div>
  )
}

function Spinner() {
  return <div>loading...</div>
}

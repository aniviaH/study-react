import { useState } from "react";

export function ExampleUseState () {
  const [count, setCount] = useState(0)
  const onClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={onClick}>click me</button>
    </div>
  )
}
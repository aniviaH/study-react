import { useState } from "react";

export function ExampleUseState () {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}
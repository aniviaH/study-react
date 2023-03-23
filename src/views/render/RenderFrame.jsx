import { useCallback, useEffect } from 'react'

export default function () {
  const handleInput = useCallback(() => {
    console.log('用户对应的输入事件被触发')
  }, [])

  // 来顶帧
  const handleClick = useCallback(() => {
    for (let i = 0; i < 50000; i++) {
      console.log(i)
    }
  }, [])

  return (
    <div>
      <input type="text" onChange={handleInput} />
      <button onClick={handleClick}>click me</button>
    </div>
  )
}

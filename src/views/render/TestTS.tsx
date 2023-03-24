import React, { useCallback, useState } from 'react'

interface User {
  name: string
  age: number
}

export default function TestTS () {
  const [count, setCount] = useState<number>(0)

  const handleClick = useCallback(() => {
    setCount((count) => count + 2)
  }, [])

  const [userList, setUserList] = useState<User[]>([
    {
      name: 'zhangsan',
      age: 18
    },
    {
      name: 'lisi',
      age: 19
    }
  ])

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={handleClick}>add count</button>
      {
        userList.map(user => (
          <div key={user.name}>{user.name}</div>
        ))
      }
    </div>
  )
}
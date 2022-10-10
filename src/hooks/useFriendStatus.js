import { useState, useEffect } from "react"

// 自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook
export default function useFriendStatus (frinedID) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange (status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    handleStatusChange({
      isOnline: true
    })
    return () => {
      // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
      handleStatusChange({
        isOnline: false
      })
    }
  })

  return isOnline
}
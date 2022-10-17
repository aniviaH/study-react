import { useState, useEffect } from "react"

const ChatAPI = {
  subscribeToFriendStatus (id, cb) {
    const statusArr = [true, false]
    // 在线状态
    const randomIndex = Math.round(Math.random())
    const status = {
      isOnline: statusArr[randomIndex],
    }
    cb && cb(status)
  },
  unsubscribeFromFriendStatus (id, cb) {
    const status = {
      isOnline: false,
    }

    cb && cb(status)
  }
}

// 自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook
export default function useFriendStatus (frinedID) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange (status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(frinedID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(frinedID, handleStatusChange)
    }
  })

  return isOnline
}
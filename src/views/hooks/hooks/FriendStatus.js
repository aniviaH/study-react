import { useState, useEffect } from 'react'

// 自定义hook
import useFriendStatus from './useFriendStatus'

export function FriendStatus(props) {
  /* const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange (status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    return () => {
      // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    };
  }); */

  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }
  return (
    <>
      <h3>自定义hook useFriendStatus</h3>
      {isOnline ? 'Online' : 'Offline'}
    </>
  )
}

export function FriendListItem(props) {
  console.log('props', props)
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <>
      <li style={{ color: isOnline ? 'green' : 'black' }}>
        {props.friend.name}
      </li>
      <Circle color={isOnline ? 'green' : 'black'}></Circle>
      <div>{props.friend.name}</div>
    </>
  )
}

export function FriendSelect() {
  const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
  ]

  // 在多个 Hook 之间传递信息
  const [recipientID, setRecipientID] = useState(1)
  const isRecipientOnline = useFriendStatus(recipientID)

  return (
    <div>
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(e.target.value)}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />

      <p>---------------------------------------------</p>
    </div>
  )
}

function Circle(props) {
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: props.color,
      }}
    ></div>
  )
}

function CompDivider() {
  return <p>---------------------------------------------</p>
}

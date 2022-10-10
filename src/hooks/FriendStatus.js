import {useState, useEffect} from 'react'

// 自定义hook
import useFriendStatus from './useFriendStatus'

export function FriendStatus (props) {
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
  return isOnline ? 'Online' : 'Offline'
}

export function FriendListItem (props) {
  console.log('props', props)
  const isOnline = useFriendStatus(props.friend.id)
  
  return (
    <li style={{color: isOnline ? 'green' : 'black'}}>
      {props.friend.name}
    </li>
  )
}
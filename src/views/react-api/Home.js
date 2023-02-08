import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

const getDataById = (id) => {
  return []
}

export default function Home() {
  const [list, setList] = useState([1, 2, 3])
  const [id, setId] = useState(0)

  useEffect(() => {
    console.log('useEffect---')
    const doQuery = async () => {
      console.log('id---', id)
      const data = getDataById(id)
      setList((list) => [...list, list[list.length - 1] + 1])
    }
    doQuery()
  }, [id]) // 依赖项数组中不需要添加setList(state的更新函数不需要作为依赖项)

  const onAddId = () => {
    setId((id) => id + 1)
  }
  return (
    <>
      <h2>Home</h2>

      <h1 style={{ color: 'red', fontSize: '12px', backgroundColor: 'green' }}>
        list: {list}
      </h1>
      <button onClick={onAddId}>add id</button>

      {/* <nav>
        <ul>
          <li>
            <Link to="/react">Home</Link>
          </li>
          <li>
            <Link to="/react/hooks">Hooks</Link>
          </li>
          <li>
            <Link to="/react/hooks-faq">Hooks-FAQ</Link>
          </li>
          <li>
            <Link to="/react/core">Core</Link>
          </li>
        </ul>
      </nav>

      <main className="main" style={{ border: `1px solid steelblue` }}>
        <Outlet />
      </main> */}
    </>
  )
}

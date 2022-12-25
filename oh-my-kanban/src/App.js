import logo from './logo.svg'
import './App.css'
import { useState } from 'react'

// const todoList = [
//   { title: '开发任务-1', status: '22-12-16 14:40' },
//   { title: '开发任务-3', status: '22-12-16 15:40' },
//   { title: '开发任务-5', status: '22-12-16 16:40' },
//   { title: '测试任务-3', status: '22-12-16 17:40' },
// ]
// const ongoingList = [
//   { title: '开发任务-4', status: '22-12-16 14:40' },
//   { title: '开发任务-6', status: '22-12-16 15:40' },
//   { title: '测试任务-2', status: '22-12-16 16:40' },
// ]
// const doneList = [
//   { title: '开发任务-2', status: '22-12-16 14:40' },
//   { title: '测试任务-1', status: '22-12-16 14:40' },
// ]

function App() {
  const [showAdd, setShowAdd] = useState(false)

  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '22-12-16 14:40' },
    { title: '开发任务-3', status: '22-12-16 15:40' },
    { title: '开发任务-5', status: '22-12-16 16:40' },
    { title: '测试任务-3', status: '22-12-16 17:40' },
  ])
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '22-12-16 14:40' },
    { title: '开发任务-6', status: '22-12-16 15:40' },
    { title: '测试任务-2', status: '22-12-16 16:40' },
  ])
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '22-12-16 14:40' },
    { title: '测试任务-1', status: '22-12-16 14:40' },
  ])

  const handleAdd = (evt) => {
    setShowAdd(true)
  }


  const handleSubmit = (title) => {
    // todoList.unshift({title, status: new Date().toDateString()})

    setTodoList(currentTodoList => [
      {title, status: new Date().toDateString()},
      ...currentTodoList
    ])

    // setShowAdd(false)
  }

  const KanbanCard = ({title, status}) => {
    return (
      <li className="kanban-card">
        <div className="card-title">{title}</div>
        <div className="card-status">{status}</div>
      </li>
    )
  }

  const KanbanNewCard = ({onSubmit}) => {
    const [title, setTitle] = useState('')
    const handleChange = (evt) => {
      setTitle(evt.target.value)
    }
    const handleKeyDown = (evt) => {
      if (evt.key === 'Enter') {
        onSubmit(title)
      }
    }
    return (
      <li className='kanban-card'>
        <h3>添加新卡片</h3>
        <div className='card-title'>
          <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
        </div>
      </li>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2 className="column-title">待处理
            <button className='btn-add-todo' disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
          </h2>
          <ul className="column-list">
            {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
            {todoList.map((props) => (
              <KanbanCard {...props} key={props.title} />
            ))}
            {/* {todoList.map((item) => (
              <li className="kanban-card">
                <div className="card-title">{item.title}</div>
                <div className="card-status">{item.status}</div>
              </li>
            ))}
            {[
              <li className="kanban-card">
                <div className="card-title">开发任务-1</div>
                <div className="card-status">22-12-16 18:15</div>
              </li>,
              <li className="kanban-card">
                <div className="card-title">开发任务-1</div>
                <div className="card-status">22-12-16 18:15</div>
              </li>,
            ]} */}
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2 className="column-title">进行中</h2>
          <ul className="column-list">
            {ongoingList.map((props) => (
              <KanbanCard {...props} key={props.title} />
            ))}
            {/* {ongoingList.map((item) => (
              <li className="kanban-card">
                <div className="card-title">{item.title}</div>
                <div className="card-status">{item.status}</div>
              </li>
            ))} */}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2 className="column-title">已完成</h2>
          <ul className="column-list">
            {doneList.map((props) => (
              <KanbanCard {...props} key={props.title} />
            ))}
            {/* {doneList.map((item) => (
              <li className="kanban-card">
                <div className="card-title">{item.title}</div>
                <div className="card-status">{item.status}</div>
              </li>
            ))} */}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App

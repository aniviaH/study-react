/** @jsxImportSource @emotion/react */
import logo from './logo.svg'
import './App.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { css } from '@emotion/react'
import KanbanBoard from './KanbanBoard'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'
import KanbanNewCard from './KanbanNewCard'
import {
  COLUMN_KEY_TODO,
  COLUMN_KEY_ONGOING,
  COLUMN_KEY_DONE,
} from './KanbanBoard'
import UseMemoAndCallbackDemo from './DemoUseMemoAndCallback'

const DATA_STORE_KEY = 'kanban-data-store'

export const MINUTE = 60 * 1000
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const UPDATE_INTERVAL = MINUTE

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2022-12-16 14:40' },
    { title: '开发任务-3', status: '2022-12-16 15:40' },
    { title: '开发任务-5', status: '2022-12-16 16:40' },
    { title: '测试任务-3', status: '2022-12-16 17:40' },
  ])
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '2022-12-16 14:40' },
    { title: '开发任务-6', status: '2022-12-16 15:40' },
    { title: '测试任务-2', status: '2022-12-16 16:40' },
  ])
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '2022-12-16 14:40' },
    { title: '测试任务-1', status: '2022-12-16 14:40' },
  ])

  // 获取卡片列表数据
  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY)
    setTimeout(() => {
      if (data) {
        const kanbanColumnData = JSON.parse(data)
        setTodoList(kanbanColumnData.todoList)
        setOngoingList(kanbanColumnData.ongoingList)
        setDoneList(kanbanColumnData.doneList)
      }

      setIsLoading(false)
    }, 1000)
  }, [])

  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList,
  }

  const handleAdd = (column, newCard) => {
    updaters[column]((currentState) => [newCard, ...currentState])
  }

  const handleRemove = (column, draggedItem) => {
    updaters[column]((currentState) =>
      currentState.filter((item) => !Object.is(item, draggedItem))
    )
  }

  const handleSaveAll = () => {
    const dataToSave = JSON.stringify({
      todoList,
      ongoingList,
      doneList,
    })
    window.localStorage.setItem(DATA_STORE_KEY, dataToSave)
  }

  return (
    <div className="App">
      <header
        css={css`
          flex: 1;
          margin: 1rem 1rem 0;
          background-color: #282c34;
          min-height: 5rem;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          font-size: calc(10px + 2vmin);
          color: white;
        `}
      >
        <h1>
          我的看板 <button onClick={handleSaveAll}>保存所有卡片</button>{' '}
          <UseMemoAndCallbackDemo />{' '}
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard
        isLoading={isLoading}
        todoList={todoList}
        ongoingList={ongoingList}
        doneList={doneList}
        onAdd={handleAdd}
        onRemove={handleRemove}
      ></KanbanBoard>
    </div>
  )
}

export default App

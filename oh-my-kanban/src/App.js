/** @jsxImportSource @emotion/react */
import logo from './logo.svg'
import './App.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import {css} from '@emotion/react'
import KanbanBoard from './KanbanBoard'
import KanbanColumn from './KanbanColumn'
import KanbanCard from './KanbanCard'
import KanbanNewCard from './KanbanNewCard'

const COLUMN_BG_COLORS = {
  loading: '#E3E3E3',
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA'
}
const DATA_STORE_KEY = 'kanban-data-store'
const COLUMN_KEY_TODO = 'todo'
const COLUMN_KEY_ONGOING = 'ongoing'
const COLUMN_KEY_DONE = 'done'

export const MINUTE = 60 * 1000
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const UPDATE_INTERVAL = MINUTE

function fibonacci (n) {
  if (n <= 2) {
    return n
  }

  return fibonacci(n-1) + fibonacci(n-2)
}

function App() {
  console.log('App-----');
  const [showAdd, setShowAdd] = useState(false)
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
  const [isLoading, setIsLoading] = useState(true)

  // useMemo的使用场景，缓存执行成本较高的计算结果
  // const memoized = useMemo(() => createByHeavyComputing(a, b), [a, b]);
      //    --------           ----------------------------------  ------
      //       ^                            ^                         ^
      //       |                            |                         |
      //   工厂函数返回值                   工厂函数                  依赖值数组
  const [num, setNum] = useState('10')
  const sum = useMemo(() => {
    const n = parseInt(num, 10)
    return fibonacci(n)
  }, [num])

  // 拖拽
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragSource, setDragSource] = useState(null)
  const [dragTarget, setDragTarget] = useState(null)
  const handleDrop = (evt) => {
    if (!draggedItem || !dragSource || !dragTarget || dragSource === dragTarget) {
      return
    }

    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList
    }
    if (dragSource) {
      updaters[dragSource](currentState => currentState.filter(item => !Object.is(item, draggedItem)))
    }
    if (dragSource) {
      updaters[dragTarget](currentState => [draggedItem, ...currentState])
    }
  }

  // useCallback的使用场景，获得记忆化的函数，使用返回的函数传给子组件，可减少子组件的更新
  // const memoizedFunc = useCallback(() => {/*省略*/}, [a, b]);
      //    ------------               ---------------   -----
      //         ^                            ^            ^
      //         |                            |            |
      //   记忆化的回调函数                   回调函数      依赖值数组
  
  // const memoizedFunc = useMemo(() => () => {/*省略*/}, [a, b]);
      //    ------------           ---------------------   -----
      //       ^                      ^  ---------------      ^
      //       |                      |         ^             |
      // 工厂函数返回的回调函数        工厂函数   回调函数        依赖值数组

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

  const handleAdd = (evt) => {
    console.log('handleAdd---', evt);
    setShowAdd(true)
  }

  const handleAddSubmit = (title) => {
    // todoList.unshift({title, status: new Date().toDateString()})

    setTodoList((currentTodoList) => [
      { title, status: new Date().toLocaleString() },
      ...currentTodoList,
    ])

    setShowAdd(false)
  }

  const handleSaveAll = () => {
    const dataToSave = JSON.stringify({
      todoList,
      ongoingList,
      doneList
    })
    window.localStorage.setItem(DATA_STORE_KEY, dataToSave)
  }

  const todoTitle = (
    <>
      <span>待处理</span>
      <button className='btn-add-todo' disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
    </>
  )

  return (
    <div className="App">
      <header css={css`
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
      `}>
        <h1>我的看板 <button onClick={handleSaveAll}>保存所有卡片</button> <span>fibonacci({num}): {sum}</span></h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        {
          isLoading ? (
            <KanbanColumn title="加载中..." bgColor={COLUMN_BG_COLORS.loading}></KanbanColumn>
          ) : (<>
            <KanbanColumn 
              bgColor={COLUMN_BG_COLORS.todo} 
              title={
                <>
                  待处理
                  <button className='btn-add-todo' disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
                </>
              }
              setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_TODO : null)}
              setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_TODO : null)}
              onDrop={handleDrop}
            >
              {showAdd && <KanbanNewCard onSubmit={handleAddSubmit} />}

              {todoList.map((props) => (
                <KanbanCard key={props.title} dragStart={() => setDraggedItem(props)} {...props} />
              ))}
            </KanbanColumn>
            <KanbanColumn
              bgColor={COLUMN_BG_COLORS.ongoing}
              title="进行中"
              setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)}
              setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)}
              onDrop={handleDrop}
            >
              {ongoingList.map((props) => (
                <KanbanCard key={props.title} dragStart={() => setDraggedItem(props)} {...props} />
              ))}
            </KanbanColumn>
            <KanbanColumn 
              bgColor={COLUMN_BG_COLORS.done} 
              title="已完成"
              setIsDragSource={(isSrc) => setDragSource(isSrc ? COLUMN_KEY_DONE : null)}
              setIsDragTarget={(isTgt) => setDragTarget(isTgt ? COLUMN_KEY_DONE : null)}
              onDrop={handleDrop}
            >
              {doneList.map((props) => (
                <KanbanCard key={props.title} dragStart={() => setDraggedItem(props)} {...props}/>
              ))}
            </KanbanColumn>
          </>)
        }
        
      </KanbanBoard>
    </div>
  )
}

export default App

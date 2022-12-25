/** @jsxImportSource @emotion/react */
import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import {css} from '@emotion/react'

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

    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList,
    ])

    // setShowAdd(false)
  }

  const kanbanCardStyles = css`
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border: 1px solid gray;
    border-radius: 1rem;
    list-style: none;
    background-color: rgba(255, 255, 255, .4);
    text-align: left;

    &:hover {
      box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, .2), inset 0 1px #fff;
    }
  `
  const kanbanCardTitleStyles = css`
    min-height: 3rem;
  `

  const KanbanCard = (props) => {
    // props.justWantToSetNewProp = '尝试修改props对象'
    return (
      <li css={kanbanCardStyles}>
        <div css={kanbanCardTitleStyles}>{props.title}</div>
        <div css={css`
          text-align: right;
          font-size: 0.8rem;
          color: #333;
        `}>{props.status}</div>
      </li>
    )
  }

  const KanbanNewCard = ({ onSubmit }) => {
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
      <li css={kanbanCardStyles}>
        <h3>添加新卡片</h3>
        <div css={css`
          ${kanbanCardTitleStyles}

          & > input[type="text"] {
            width: 100%;
          }
        `}>
          <input
            type="text"
            value={title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </li>
    )
  }

  const KanbanBoard = ({ children }) => (
    // <main className="kanban-board">{children}</main>
    <main
      css={css`
        flex: 10;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin: 0 1rem 1rem;
      `}
    >
      {children}
    </main>
  )

  const KanbanColumn = ({ children, className, title, bgColor }) => {
    // const combinedClassName = `kanban-column ${className}`
    return (
      <section css={css`
        flex: 1 1;
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: ${bgColor};

        & > .column-title {
          margin: 0.6rem 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid gray;

          & .btn-add-todo  {
            float: right;
            margin-top: 0.2rem;
            padding: 0.2rem 0.5rem;
            border: 0;
            border-radius: 1rem;
            height: 1.8rem;
            line-height: 1rem;
            font-size: 1rem;
          }
        }

        & .column-list {
          flex: 1;
          flex-basis: 0;
          margin: 1rem;
          padding: 0;
          overflow: auto;
        }

        /* &.column-todo {
          background-color: #C9AF97;
        }
        &.column-ongoing {
          background-color: #FFE799;
        }
        &.column-done {
          background-color: #C0E8EA;
        } */
      `}>
        <h2 className="column-title">{title}</h2>
        <ul className="column-list">{children}</ul>
      </section>
    )
  }

  const todoTitle = (
    <>
      <span>待处理</span>
      <button className='btn-add-todo' disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
    </>
  )

  const COLUMN_BG_COLORS = {
    todo: '#C9AF97',
    ongoing: '#FFE799',
    done: '#C0E8EA'
  }

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
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.todo} title={
          <>
            待处理
            <button className='btn-add-todo' disabled={showAdd} onClick={handleAdd}>&#8853; 添加新卡片</button>
          </>
        }>
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}

          {todoList.map((props) => (
            <KanbanCard {...props} key={props.title} />
          ))}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="进行中">
          {ongoingList.map((props) => (
            <KanbanCard {...props} key={props.title} />
          ))}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="已完成">
          {doneList.map((props) => (
            <KanbanCard {...props} key={props.title} />
          ))}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  )
}

export default App

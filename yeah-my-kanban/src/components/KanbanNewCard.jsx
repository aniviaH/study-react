import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { kanbanCardStyles, kanbanCardTitleStyles } from './KanbanCard'

export default function KanbanNewCard({ onSubmit }) {
  const [title, setTitle] = useState('')

  const inputElem = useRef(null)

  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }
  const handleKeyDown = (evt) => {
    console.log('handleKeyDown---', evt)
    if (evt.key === 'Enter') {
      const newCard = {
        title,
        status: new Date().toLocaleDateString(),
      }
      onSubmit(newCard)
    }
    // if (evt.key === 'Escape') {
    //   setShowAdd(false)
    // }
  }

  useEffect(() => {
    inputElem.current.focus()
  }, [])

  return (
    <li css={kanbanCardStyles}>
      <h3>添加新卡片</h3>
      <div
        css={css`
          ${kanbanCardTitleStyles}

          & > input[type="text"] {
            width: 100%;
          }
        `}
      >
        <input
          type="text"
          value={title}
          ref={inputElem}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </li>
  )
}

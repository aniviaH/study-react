/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import KanbanColumn from './KanbanColumn'

const COLUMN_BG_COLORS = {
  loading: '#E3E3E3',
  todo: '#C9AF97',
  ongoing: '#FFE799',
  done: '#C0E8BA',
}

export const COLUMN_KEY_TODO = 'todo'
export const COLUMN_KEY_ONGOING = 'ongoing'
export const COLUMN_KEY_DONE = 'done'

const kanbanBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`

export default function KanbanBoard({
  isLoading,
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onRemove,
}) {
  // 拖拽
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragSource, setDragSource] = useState(null)
  const [dragTarget, setDragTarget] = useState(null)

  const handleDrop = (evt) => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return
    }

    if (dragSource) {
      onRemove && onRemove(dragSource, draggedItem)
    }
    if (dragTarget) {
      onAdd && onAdd(dragTarget, draggedItem)
    }
  }

  return (
    <main css={kanbanBoardStyles}>
      {isLoading ? (
        <KanbanColumn
          title="加载中..."
          bgColor={COLUMN_BG_COLORS.loading}
        ></KanbanColumn>
      ) : (
        <>
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.todo}
            title="待处理"
            setIsDragSource={(isSrc) =>
              setDragSource(isSrc ? COLUMN_KEY_TODO : null)
            }
            setIsDragTarget={(isTgt) =>
              setDragTarget(isTgt ? COLUMN_KEY_TODO : null)
            }
            setDraggedItem={setDraggedItem}
            cardList={todoList}
            canAddNew
            onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
            onDrop={handleDrop}
          ></KanbanColumn>
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.ongoing}
            title="进行中"
            setIsDragSource={(isSrc) =>
              setDragSource(isSrc ? COLUMN_KEY_ONGOING : null)
            }
            setIsDragTarget={(isTgt) =>
              setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null)
            }
            setDraggedItem={setDraggedItem}
            cardList={ongoingList}
            onDrop={handleDrop}
          ></KanbanColumn>
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.done}
            title="已完成"
            setIsDragSource={(isSrc) =>
              setDragSource(isSrc ? COLUMN_KEY_DONE : null)
            }
            setIsDragTarget={(isTgt) =>
              setDragTarget(isTgt ? COLUMN_KEY_DONE : null)
            }
            setDraggedItem={setDraggedItem}
            cardList={doneList}
            onDrop={handleDrop}
            onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}
          ></KanbanColumn>
        </>
      )}
    </main>
  )
}

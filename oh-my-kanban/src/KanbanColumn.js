/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

export default function KanbanColumn({
  children, className, title, bgColor, setIsDragSource = () => { }, setIsDragTarget = () => { }, onDrop
}) {
  const kanbanColumnStyles = css`
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

      & .btn-add-todo {
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
  `;
  // const combinedClassName = `kanban-column ${className}`
  return (
    <section
      onDragStart={() => setIsDragSource(true)} // 由KanbanCard的onDragStart冒泡触发
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        setIsDragTarget(true);
      } }
      onDragLeave={(evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'none';
        setIsDragTarget(false);
      } }
      onDrop={(evt) => {
        evt.preventDefault();
        onDrop && onDrop();
      } }
      onDragEnd={(evt) => {
        evt.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      } }
      css={kanbanColumnStyles}
    >
      <h2 className="column-title">{title}</h2>
      <ul className="column-list">{children}</ul>
    </section>
  );
}

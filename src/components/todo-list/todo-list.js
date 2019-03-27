import React from 'react';

import TodoListItem from '../todo-list-item';

export default function TodoList({
  items,
  onToggleImportant,
  onToggleDone,
  onDelete
}) {
  const list = items.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          onDelete={() => onDelete(id)}
        />
      </li>
    );
  });
  return <ul className="list-group">{list}</ul>;
}

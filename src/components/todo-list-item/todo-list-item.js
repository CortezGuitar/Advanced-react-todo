import React from 'react';

import './todo-list-item.css';

export default function TodoListItem({
  important,
  done,
  label,
  onToggleImportant,
  onToggleDone,
  onDelete
}) {
  let classNames = 'todo-list-item';

  if (important) {
    classNames += ' important';
  }

  if (done) {
    classNames += ' done';
  }

  return (
    <span className={classNames}>
      <span className="todo-list-item-label" onClick={onToggleDone}>
        {label}
      </span>

      <button
        className="btn btn-outline-success btn-sm float-right"
        onClick={onToggleImportant}
      >
        <i className="fa fa-exclamation" />
      </button>

      <button
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDelete}
      >
        <i className="fa fa-trash-alt" />
      </button>
    </span>
  );
}

import React from 'react';
import { propTypes as todoShape, defaultProps as todoDefaults } from 'schemas/Todo';

const TodoListItem = ({ ID, Description, IsDone }) => {
  const id = `todo-${ID}`;

  return (
    <label htmlFor={id}>
      <input type="checkbox" checked={IsDone} id={id} name="todos[]" value={ID} readOnly />
      <span>{Description}</span>
    </label>
  );
};

TodoListItem.propTypes = todoShape;

TodoListItem.defaultProps = todoDefaults;

export { TodoListItem as Component };

export default TodoListItem;

import React from 'react';
import { propTypes as todoShape, defaultProps as todoDefaults } from 'schemas/Todo';

const TodoListItem = ({ ID, Description, IsDone }) => (
  <div>
    <input type="checkbox" checked={IsDone} name={`todo-${ID}`} />
    <span>{Description}</span>
  </div>
);

TodoListItem.propTypes = todoShape;

TodoListItem.defaultProps = todoDefaults;

export { TodoListItem as Component };

export default TodoListItem;

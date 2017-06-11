import React from 'react';
import { propTypes as todoShape, defaultProps as todoDefaults } from 'schemas/Todo';

const TodoListItem = props => (
  <div><span>[{props.IsDone ? 'x' : ' '}]</span> {props.Description}</div>
);

TodoListItem.propTypes = todoShape;

TodoListItem.defaultProps = todoDefaults;

export { TodoListItem as Component };

export default TodoListItem;

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { propTypes as todoType } from 'schemas/Todo';
import readTodos from 'states/todos/readTodos';
import TodoListItem from 'components/todo/TodoListItem';

const TodoList = ({ reload, error, loading, todos, totalCount }) => (
  <div>
    {reload && <button onClick={() => reload()}>Reload list</button>}
    {error && <span className="error">{error.message}</span>}
    {loading
      ? <div>Loading...</div>
      : <div>Total: {totalCount}</div>
    }
    {todos.length > 0 &&
      <ul>
        {todos.map(todo => (
          <li key={todo.ID}><TodoListItem {...todo} /></li>
        ))}
      </ul>
    }
  </div>
);

TodoList.propTypes = {
  reload: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.shape(todoType)),
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
    graphQLErrors: PropTypes.array,
  }),
};

TodoList.defaultProps = {
  reload: null,
  todos: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export { TodoList as Component };

export default compose(
  // from react-redux, set redux data to props here
  // connect(mapStateToProps, mapDispatchToProps),

  // use the graphql HOC to populate data, add a config to set variables for the query
  readTodos,
)(TodoList);

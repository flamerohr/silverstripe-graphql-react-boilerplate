import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { propTypes as todoType } from 'schemas/Todo';
import readTodos from 'states/todos/readTodos';
import TodoListItem from 'components/todo/TodoListItem';

const TodoList = ({ reload, error, loading, Todos, totalCount }) => {
  const handleReload = (event) => {
    event.preventDefault();
    reload();
  };

  return (
    <div>
      {error && <span className="error">{error.message}</span>}
      {loading
        ? <div>Loading...</div>
        : <div>Total: {totalCount}</div>
      }
      {Todos.length > 0 &&
      <ul>
        {Todos.map(todo => (
          <li key={todo.ID}><TodoListItem {...todo} /></li>
        ))}
      </ul>
      }
      <ul>
        <li><Link to="/create">Create new</Link></li>
        {reload &&
        <li><Link to="/" onClick={handleReload}>Reload list</Link></li>
        }
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  reload: PropTypes.func,
  Todos: PropTypes.arrayOf(PropTypes.shape(todoType)),
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
    graphQLErrors: PropTypes.array,
  }),
};

TodoList.defaultProps = {
  reload: null,
  Todos: [],
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

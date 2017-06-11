import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import readQueryCreator from 'lib/graphql/readQueryCreator';
import { fields, pluralName as name, propTypes as todoType } from 'schemas/Todo';
import TodoListItem from './TodoListItem';

const TodoList = props => (
  <div>
    {props.reload && <button onClick={() => props.reload()}>Reload list</button>}
    {props.error && <span className="error">{props.error.message}</span>}
    {props.loading
      ? <div>Loading...</div>
      : <div>Total: {props.totalCount}</div>
    }
    {props.todos.length > 0 &&
      <ul>
        {props.todos.map(todo => (
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

const config = {
  // juggle the graphql data obtained to a more meaningful structure, similar to mapStateToProps
  props: ({ data }) => {
    const list = data[`read${name}`];

    return {
      reload: data.refetch,
      todos: list && list.edges.map(edge => edge.node),
      totalCount: list && list.pageInfo.totalCount,
      loading: data.loading,
      error: data.error,
    };
  },
};

const readTodos = readQueryCreator(name, fields);

export { TodoList as Component };

export default compose(
  // from react-redux, set redux data to props here
  // connect(mapStateToProps, mapDispatchToProps),

  // use the graphql HOC to populate data, add a config to set variables for the query
  graphql(readTodos, config),
)(TodoList);

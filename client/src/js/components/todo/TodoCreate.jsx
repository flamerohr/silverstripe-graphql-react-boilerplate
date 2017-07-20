import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import stateful from 'lib/stateful';
import createTodo from 'states/todos/createTodo';
import { propTypes as todoShape, defaultProps as todoDefaults } from 'schemas/Todo';

const TodoCreate = ({ Description, mutate, setState }) => {
  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setState({
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let error = '';
    if (Description.length > 0) {
      mutate({ Description });
    } else {
      error = 'Need a longer description.';
    }
    setState({ error });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Description" value={Description} onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

TodoCreate.propTypes = {
  ...todoShape,
  mutate: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
};

export default compose(
  // from react-redux, set redux data to props here
  // connect(mapStateToProps, mapDispatchToProps),
  stateful(() => ({ ...todoDefaults, error: '' })),

  // use the graphql HOC to populate data, add a config to set variables for the query
  createTodo((data, props) => props.history.push('/')),
)(TodoCreate);

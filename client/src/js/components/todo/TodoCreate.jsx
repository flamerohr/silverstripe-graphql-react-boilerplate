import React, { Component } from 'react';
import { compose } from 'react-apollo';
import createTodo from 'states/todos/createTodo';

class TodoCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>Creating!</div>
    );
  }
}

export default compose(
  // from react-redux, set redux data to props here
  // connect(mapStateToProps, mapDispatchToProps),

  // use the graphql HOC to populate data, add a config to set variables for the query
  // createTodo,
)(TodoCreate);

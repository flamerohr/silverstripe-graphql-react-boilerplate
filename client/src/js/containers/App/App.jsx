import React from 'react';
import { Route, Link } from 'react-router-dom';
import TodoList from 'components/todo/TodoList';
import TodoCreate from 'components/todo/TodoCreate';
import TodoUpdate from 'components/todo/TodoUpdate';

function App() {
  return (
    <div className="todo">
      <header>
        <h1>Todo list</h1>
      </header>
      <div className="body flex flex--from-top">
        <Route exact path="/" component={TodoList} />
        <Route path="/create" component={TodoCreate} />
        {/* <Route path="/edit/:todoId" component={TodoUpdate} /> */}
      </div>
      <footer>
        My actions here
      </footer>
    </div>
  );
}

App.propTypes = {};

App.defaultProps = {};

export default App;

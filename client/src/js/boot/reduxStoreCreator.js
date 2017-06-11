/* global window */
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

function reduxStoreCreator(reducers, middlewares) {
// check for redux devtools composer in development mode
  const composeTools = (
      process.env.NODE_ENV !== 'production' &&
      // eslint-disable-next-line no-underscore-dangle
      (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ) ||
    compose;

  return createStore(
    combineReducers(reducers),
    composeTools(
      applyMiddleware(...middlewares),
    ),
  );
}

export default reduxStoreCreator;

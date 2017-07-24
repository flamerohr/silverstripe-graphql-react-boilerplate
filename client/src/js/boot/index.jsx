/* global window, document */
import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import apolloClientCreator from 'boot/apolloClientCreator';
import reduxStoreCreator from 'boot/reduxStoreCreator';
import reducers from 'boot/reducers';
import App from 'containers/App';

import 'main.scss';

// only the first container is used, can change to querySelectorAll() for multiple instances
const container = document.querySelector('.todo__app');

const client = apolloClientCreator(container.dataset.apiUrl);
const store = reduxStoreCreator({
  ...reducers,
  // adding apollo-client's reducer
  apollo: client.reducer(),
}, [
  // can remove this if you don't care for apollo-client's redux calls to appear in your store
  client.middleware(),
]);

const boot = () => (
  render((
    <ApolloProvider store={store} client={client}>
      <BrowserRouter basename={container.dataset.appRoot || '/app/'}>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  ), container)
);

// checks for if the DOM is ready and loaded before booting
const loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.includes(document.readyState) && document.body) {
  boot();
} else {
  window.addEventListener('DOMContentLoaded', boot, false);
}

import React from 'react';
import title from 'components/title/title';
import App from './App';

const AppRouter = title('Todo list')(props => (
  <App {...props} />
));

AppRouter.propTypes = {};

AppRouter.defaultProps = {};

export default AppRouter;

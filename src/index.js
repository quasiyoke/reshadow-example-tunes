import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

function renderApp() {
  const App = require('./components/App').default;
  render(
    <App />,
    document.querySelector('main'),
  );
}

renderApp();
module.hot.accept(renderApp);

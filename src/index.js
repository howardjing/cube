// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {
  useStrict,
  autorun,
} from 'mobx';
import { Provider } from 'mobx-react';
import Database from './database';
import createStore from './domains/create-store';
import App from './ui';
import './index.css'

useStrict(true);

const db = new Database();
const store = createStore(db);

// keep window path in sync with route
autorun(() => {
  const path = store.routes.currentPath;
  if (window.location.pathname !== path) {
    window.history.pushState(null, null, path);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

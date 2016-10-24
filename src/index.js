// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import App from './ui';
import Database from './database';
import Store from './store';
import './index.css';

useStrict(true);

const db = new Database();
const store = new Store(db);

// fetch data from indexedDB
store.requestSolves()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

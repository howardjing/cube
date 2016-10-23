import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/app';
import Database from './database';
import './index.css';

const db = new Database();
db.requestSolves()
  .then((solves) => {
    console.log("hey", solves);
  })

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

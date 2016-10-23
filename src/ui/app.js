// @flow
import React, { Component } from 'react';
import { css } from 'aphrodisiac';
import logo from './logo.svg';
import styles from './styles';
import SolveTime from './solve-time';

class App extends Component {
  render(): React.Element<React.DOM.div> {
    return (
      <div className={css(styles.app)}>
        <div className={css(styles.appHeader)}>
          <img src={logo} className={css(styles.appLogo)} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={css(styles.appIntro)}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SolveTime
          className={css(styles.timer)}
          time={123456}
        />
      </div>
    );
  }
}

export default App;

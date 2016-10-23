// @flow
import React from 'react';
import { css } from 'aphrodisiac';
import styles from './styles';
import SolveTime from './solve-time';
import PreviousSolves from './previous-solves';

const App = () => (
  <div className={css(styles.container)}>
    <div className={css(styles.primary)}>
      <div className={css(styles.currentSolve)}>
        <div className={css(styles.scramble)}>
          Some sick scramble
        </div>
        <div>
          <SolveTime
            className={css(styles.solveTime)}
            time={null}
          />
          <div>
            Press and hold space to start inspecting
          </div>
        </div>
        <div />
      </div>
    </div>
    <div className={css(styles.secondary)}>
      <PreviousSolves />
    </div>
  </div>
);

export default App;

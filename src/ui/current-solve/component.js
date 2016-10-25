// @flow
import React from 'react';
import { css } from 'aphrodisiac';
import Solve from '../../store/solve';
import SolveTime from '../_common/solve-time';
import styles from './styles';

const CurrentSolve = ({
  solve
}: {
  solve: Solve
}) => (
  <div className={css(styles.currentSolve)}>
    <div className={css(styles.scramble)}>
      {solve.scramble.join(" ")}
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
);

export default CurrentSolve;
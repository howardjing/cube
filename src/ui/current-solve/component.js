// @flow
import React from 'react';
import { css } from 'aphrodisiac';
import Solve from '../../store/solve';
import SolveTime from '../_common/solve-time';
import styles from './styles';

const CurrentSolve = ({
  solve,
  onClickRefresh,
}: {
  solve: Solve,
  onClickRefresh: () => void,
}) => (
  <div className={css(styles.currentSolve)}>
    <div className={css(styles.scramble)}>
      {solve.scramble.join(" ")}
      <span
        className={css(styles.rescramble)}
        onClick={onClickRefresh}
      >
        &nbsp;🔄
      </span>
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
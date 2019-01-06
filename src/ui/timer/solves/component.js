// @flow
import React, { Component } from 'react';
import { css } from 'aphrodite';
import type { List } from 'immutable';
import Solve from '../../../domains/timer/solve';
import SolveTime from '../_common/solve-time';
import styles from './styles';

const DisplaySolve = class extends Component {
  props: {
    solve: Solve,
    deleteSolve: () => void,
  };

  deleteSolve = () => {
    const { solve, deleteSolve } = this.props;
    const id = solve.getId();
    deleteSolve(id);
  };

  render() {
    const { solve } = this.props;
    const solveTime = solve.getSolveTime();
    return (
      <div>
        <SolveTime
          className={css(styles.solveTime)}
          time={solveTime}
        />
        <span
          className={css(styles.deleteIcon)}
          onClick={this.deleteSolve}
        >
          &nbsp;<span role="img" aria-label="remove">❌</span>
        </span>
      </div>
    )
  }
}

const Solves = ({
  solves,
  deleteSolve,
}: {
  solves: List<Solve>,
  deleteSolve: () => void,
}) => {
  const recent = solves.slice(0, 12).map((solve) => (
    <li key={solve.id}>
      <DisplaySolve
        solve={solve}
        deleteSolve={deleteSolve}
      />
    </li>
  ));

  return (
    <ul>
      {recent}
    </ul>
  )
}

export default Solves;

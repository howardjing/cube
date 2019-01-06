// @flow
import React, { Component } from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite';
import type { Status, Move } from 'domains/timer';
import Solve from 'domains/timer/solve';
import SolveTime from '../_common/solve-time';
import styles from './styles';
import Cube from './cube';

type Props = {
  solve: Solve,
  scramble: List<Move>,
  status: Status,
  onClickRefresh: () => void,
  startInspecting: () => void,
  startSolving: () => void,
  stopSolving: () => void,
  tickInspection: () => void,
  tickSolve: () => void,
};

// space button code
const SPACE = 'Space';

// how often we update timer
const TICK_INTERVAL = 1;

const Timer = ({
  solve,
  status,
}: {
  solve: Solve,
  status: Status,
}) => {
  const time = status === 'inspecting' ?
    solve.inspectionTime :
    solve.solveTime;
  return (
    <SolveTime
      className={css(styles.timer)}
      time={time}
    />
  );
};

const Message = ({ status }: {
  status: Status,
}) => {
  if (status === 'idle') {
    return (
      <div>Press and hold space to start inspecting</div>
    );
  } else if (status === 'inspecting') {
    return (
      <div>Release space when finished inspecting</div>
    );
  } else {
    return (
      <div>Press space when finished solving</div>
    );
  }
};

class CurrentSolve extends Component {
  props: Props;
  inspectionIntervalId: ?number;
  solveIntervalId: ?number;

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keyup', this.handleKeyup);
  }

  startInspecting = () => {
    const {
      startInspecting,
      tickInspection,
    } = this.props;
    startInspecting();
    this.inspectionIntervalId = setInterval(tickInspection, TICK_INTERVAL);
  }

  startSolving = () => {
    const {
      startSolving,
      tickSolve,
    } = this.props;
    if (this.inspectionIntervalId) {
      clearInterval(this.inspectionIntervalId);
    }
    startSolving();
    this.solveIntervalId = setInterval(tickSolve, TICK_INTERVAL);
  }

  stopSolving = () => {
    const {
      stopSolving,
    } = this.props;
    if (this.solveIntervalId) {
      clearInterval(this.solveIntervalId);
    }
    stopSolving();
  }

  handleKeydown = (e: KeyboardEvent) => {
    if (e.code !== SPACE) { return; }

    const {
      status,
    } = this.props;

    if (status === 'idle') {
      this.startInspecting();
    } else if (status === 'solving') {
      this.stopSolving();
    }
  };

  handleKeyup = (e: KeyboardEvent) => {
    if (e.code !== SPACE) { return; }

    const {
      status,
    } = this.props;

    /**
     * user has just released the space button,
     * we should start the solve timer.
     */
    if (status === 'inspecting') {
      this.startSolving();
    }
  }

  render() {
    const {
      status,
      scramble,
      solve,
      onClickRefresh
    } = this.props;

    return (
      <div className={css(styles.currentSolve)}>
        <div className={css(styles.scramble)}>
          {scramble.join(' ')}
          <span
            className={css(styles.rescramble)}
            onClick={onClickRefresh}
          >
            &nbsp;<span role="img" aria-label="rescramble">🔄</span>
          </span>
        </div>
        <div>
          <Timer
            status={status}
            solve={solve}
          />
          <Message status={status} />
          <Cube />
        </div>
        <div />
      </div>
    )
  }
};

export default CurrentSolve;

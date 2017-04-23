// @flow
import React from 'react';
import { css } from 'aphrodisiac';
import styles from './styles';
import Solves from './solves';
import CurrentSolve from './current-solve';
import Trend from './trend';
import Link from 'ui/_common/link';

const Timer = () => (
  <div className={css(styles.container)}>
    <Link
      to="tutorial"
    >
      Tutorial
    </Link>
    <div className={css(styles.primary)}>
      <CurrentSolve />
      <Trend />
    </div>
    <div className={css(styles.secondary)}>
      <Solves />
    </div>
  </div>
);

export default Timer;

// @flow

import React from 'react';
import { css } from 'aphrodisiac';
import format from './format';
import styles from './styles';

const SolveTime = ({
  className,
  time,
}: {
  className?: string,
  time: ?number,
}) => {
  const string = time ? format(time) : "--:--.---"
  const klass = className || css(styles.time);

  return (
    <div className={klass}>
      {string}
    </div>
  )
}

export default SolveTime
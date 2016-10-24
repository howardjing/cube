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
  const formattedTime = time ? format(time) : "--:--.---"
  const klass = className || css(styles.time);

  return (
    <div className={klass}>
      {formattedTime}
    </div>
  )
}

export default SolveTime
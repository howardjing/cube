// @flow
import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite';
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries
} from 'react-vis';
import 'react-vis/main.css';
import Solve from '../../../domains/timer/solve';
import styles from './styles';

const Trend = ({
  solves
}: {
  solves: List<Solve>
}) => {
  const data: { x: number, y: number }[] = [];
  // not using map / filter because flow doesn't play nice with filter.
  // see https://github.com/facebook/flow/issues/509
  solves
    // reversing because solves are presented reverse chronologically
    .reverse()
    .forEach((solve: Solve, i: number) => {
      if (!solve.start || !solve.solveTime) { return; }

      data.push({
        x: solve.start,
        y: solve.solveTime / 1000
      });
    });

  const maxTime = Math.max(...data.map((time) => time.y));
  const width = document.body ?
    document.body.clientWidth * 0.8 :
    400;
  const height = 200;

  return (
    <div className={css(styles.trend)}>
      <XYPlot
        width={width}
        height={height}
        yDomain={[0, maxTime]}
        xType="ordinal"
      >
        <LineSeries
          data={data}
          strokeWidth={1}
        />
        <XAxis
          tickSize={0}
          tickValues={[]}
        />
        <YAxis tickSize={0} />
      </XYPlot>
    </div>
  );
}

export default Trend;

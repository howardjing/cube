// @flow
import React from 'react';
import type { List } from 'immutable';
import Solve from '../../store/solve';
import SolveTime from '../_common/solve-time';

const Solves = ({
  solves,
}: {
  solves: List<Solve>
}) => {
  const recent = solves.slice(0, 12).map((solve) => (
    <li key={solve.id}>
      <SolveTime time={solve.solveTime} />
    </li>
  ));

  return (
    <ul>
      {recent}
    </ul>
  )
}

export default Solves;
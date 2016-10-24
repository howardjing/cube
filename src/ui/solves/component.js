// @flow
import React from 'react';
import Solve from '../../store/solve';
import SolveTime from '../_common/solve-time';

const Solves = ({
  solves,
}: {
  solves: Solve[]
}) => {
  const recent = solves.slice(0, 12).map((solve) => (
    <li><SolveTime time={solve.solveTime} /></li>
  ));

  return (
    <ul>
      {recent}
    </ul>
  )
}

export default Solves;
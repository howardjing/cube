// @flow
import React from 'react';
import Solve from '../../store/solve';
import SolveTime from '../solve-time';

const PreviousSolves = ({
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

export default PreviousSolves;
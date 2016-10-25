// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import type Solve from '../../store/solve';
import Store from '../../store';

const CurrentSolve = ({ store }: {
  store: Store
}) => {
  const solve: Solve = store.solve;
  console.log("yo", solve)
  return (
    <Component
      solve={solve}
    />
  );
};

export default inject('store')(observer(CurrentSolve));


// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import { Store } from 'domains/create-store';

const Solves = ({ store }: {
  store: Store
}) => {
  const solves = store.timer.solves;
  const deleteSolve = store.timer.requestDeleteSolve;
  return (
    <Component
      solves={solves}
      deleteSolve={deleteSolve}
    />
  );
};

export default inject('store')(observer(Solves));


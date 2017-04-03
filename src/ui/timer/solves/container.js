// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import Store from '../../../store';

const Solves = ({ store }: {
  store: Store
}) => {
  const solves = store.solves;
  const deleteSolve = store.requestDeleteSolve;
  return (
    <Component
      solves={solves}
      deleteSolve={deleteSolve}
    />
  );
};

export default inject('store')(observer(Solves));


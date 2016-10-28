// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import type Solve from '../../store/solve';
import Store from '../../store';

const CurrentSolve = ({ store }: {
  store: Store
}) => {
  const solve = store.solve;
  const status = store.status;
  const onClickRefresh = store.requestNewSolve;
  const startInspecting = store.requestStartInspecting;
  const startSolving = store.requestStartSolving;
  const stopSolving = store.requestStopSolving;
  const tickInspection = store.requestTickInspection;
  const tickSolve = store.requestTickSolve;
  return (
    <Component
      solve={solve}
      status={status}
      onClickRefresh={onClickRefresh}
      startInspecting={startInspecting}
      startSolving={startSolving}
      stopSolving={stopSolving}
      tickInspection={tickInspection}
      tickSolve={tickSolve}
    />
  );
};

export default inject('store')(observer(CurrentSolve));


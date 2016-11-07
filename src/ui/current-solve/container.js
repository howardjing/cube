// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import Store from '../../store';

const CurrentSolve = ({ store }: {
  store: Store
}) => {
  const solve = store.solve;
  const scramble = store.scramble;
  const status = store.status;
  const onClickRefresh = store.requestNewScramble;
  const startInspecting = store.requestStartInspecting;
  const startSolving = store.requestStartSolving;
  const stopSolving = store.requestStopSolving;
  const tickInspection = store.requestTickInspection;
  const tickSolve = store.requestTickSolve;
  return (
    <Component
      solve={solve}
      scramble={scramble}
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


// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import { Store } from 'domains/create-store';

const CurrentSolve = ({ store }: {
  store: Store
}) => {
  const solve = store.timer.solve;
  const scramble = store.timer.scramble;
  const status = store.timer.status;
  const onClickRefresh = store.timer.requestNewScramble;
  const startInspecting = store.timer.requestStartInspecting;
  const startSolving = store.timer.requestStartSolving;
  const stopSolving = store.timer.requestStopSolving;
  const tickInspection = store.timer.requestTickInspection;
  const tickSolve = store.timer.requestTickSolve;
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

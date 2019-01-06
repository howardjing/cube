// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import { Store } from '../../../domains/create-store';

const Trend = ({ store }: {
  store: Store
}) => {
  return (
    <Component
      solves={store.timer.solves.slice(0, 200)}
    />
  );
};

export default inject('store')(observer(Trend));

// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import Store from '../../store';

const Solves = ({ store }: {
  store: Store
}) => {
  return (
    <Component
      solves={store.solves}
    />
  );
};

export default inject('store')(observer(Solves));


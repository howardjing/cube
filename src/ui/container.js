// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import Component from './component';
import { Store } from 'domains/create-store';

const App = ({ store }: {
  store: Store
}) => {
  const route = store.routes.currentRoute;
  return (
    <Component
      route={route}
    />
  );
}

export default inject('store')(observer(App));
// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Store } from 'domains/create-store';
import type { Route } from 'domains/routes';
import Component from './component';

type Props = {
  store: Store,
  to: Route,
  target?: string,
  children: React.Element<*>,
};

const Link = ({
  store,
  to,
  target,
  children,
}: Props) => {
  const routes = store.routes;
  return (
    <Component
      routes={routes}
      to={to}
      target={target}
      children={children}
    />
  );
};

export default inject('store')(observer(Link));

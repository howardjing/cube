// @flow
import React from 'react';
import type { Route } from 'domains/routes';
import Timer from './timer';
import Tutorial from './tutorial';

const App = ({ route }: {
  route: ?Route
}) => {
  switch (route) {
    case 'timer':
      return <Timer />;
    case 'tutorial':
      return <Tutorial />;
    default:
      return null;
  }
}

export default App;
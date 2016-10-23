// @flow
import {
  extendObservable,
  action,
} from 'mobx';
// eslint-disable-next-line no-unused-vars
import type Database, { Solve as SolveJson } from '../database';
import Solve from './solve';

const observables = {
  solves: [],
  solve: null,
  isSolving: false,
};

class Store {
  db: Database;

  // previous solves
  solves: Solve[];

  // the current solve
  solve: ?Solve;

  // are we solving the current solve?
  isSolving: boolean;

  constructor(db: Database) {
    this.db = db;
    extendObservable(this, observables);
  }

  _requestSolves = (): Promise<Solve[]> => {
    return this.db.requestSolves()
      .then((solves) => {
        return solves.map((json) =>
          new Solve(json)
        );
      });
  }

  requestSolves = action((): Promise<Solve[]> => {
    return this._requestSolves()
      .then(action((solves) => {
        this.solves = solves;
        return solves;
      }));
  })
}

export default Store;
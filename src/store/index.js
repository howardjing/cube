// @flow
import {
  extendObservable,
  action,
} from 'mobx';
// eslint-disable-next-line no-unused-vars
import type Database, { Solve as SolveJson } from '../database';
import Solve from './solve';

type Status = 'idle' | 'inspecting' | 'solving';

const observables = {
  solves: [],
  solve: Solve.build(),
  status: 'idle',
};

class Store {
  db: Database;

  // previous solves
  solves: Solve[];

  // the current solve
  solve: Solve;

  // are we solving the current solve?
  status: Status;

  constructor(db: Database) {
    this.db = db;
    extendObservable(this, observables);
  }

  _requestSolves = (): Promise<Solve[]> => {
    return this.db.requestSolves()
      .then((solves) => {
        return solves.map((json) =>
          Solve.fromJson(json)
        );
      });
  }

  requestSolves = action((): Promise<Solve[]> => {
    return this._requestSolves()
      .then(action((solves) => {
        this.solves = solves;
        return solves;
      }));
  });

  requestNewSolve = action(() => {
    this.solve = Solve.build();
  });

  requestStartInspecting = action(() => {
    this.solve = this.solve.setStart(Date.now());
    this.status = 'inspecting';
  });

  setInspectionTime = () => {
    this.solve = this.solve.setInspectionTime(
      Date.now() - this.solve.start
    );
  }

  requestStartSolving = action(() => {
    this.setInspectionTime();
    this.status = 'solving';
  });

  requestStopSolving = action(() => {
    this.setSolveTime();
    this.status = 'idle';
  });

  /**
   * @private
   */
  setSolveTime = () => {
    this.solve = this.solve.setSolveTime(
      Date.now() - (
        this.solve.start +
        this.solve.inspectionTime
      )
    );
  };

  requestTickInspection = action(this.setInspectionTime);
  requestTickSolve = action(this.setSolveTime);
}

export default Store;
export type {
  Status
};
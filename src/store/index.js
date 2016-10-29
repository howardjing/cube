// @flow
import {
  extendObservable,
  action,
} from 'mobx';
import { List } from 'immutable';
// eslint-disable-next-line no-unused-vars
import type Database, { Solve as SolveJson } from '../database';
import Solve from './solve';
import type { Move } from './solve';
import _scramble from './scramble';

type Status = 'idle' | 'inspecting' | 'solving';

function scramble(): List<Move> {
  return List(_scramble());
}

const observables = {
  solves: List(),
  scramble: scramble(),
  solve: Solve.build(),
  status: 'idle',
};

class Store {
  db: Database;

  // previous solves
  solves: List<Solve>;

  // the current solve
  solve: Solve;

  // the current scramble
  scramble: List<Move>;

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

  requestNewScramble = action(() => {
    this.scramble = scramble();
  });

  requestNewSolve = action(() => {
    this.solve = Solve.build();
  });

  requestStartInspecting = action(() => {
    this.solve = this.solve.setStart(Date.now());
    this.status = 'inspecting';
  });

  tickInspection = () => {
    return this.solve.setInspectionTime(
      Date.now() - this.solve.start
    );
  }

  requestStartSolving = action(() => {
    this.solve = this.tickInspection();
    this.status = 'solving';
  });

  requestStopSolving = action(() => {
    this.solve = this
      .tickSolve()
      .setScramble(this.scramble);
    this.scramble = scramble();
    this.status = 'idle';
  });

  /**
   * @private
   */
  tickSolve = () => {
    return this.solve.setSolveTime(
      Date.now() - (
        this.solve.start +
        this.solve.inspectionTime
      )
    );
  };

  requestTickInspection = action(() => {
    this.solve = this.tickInspection();
  });
  requestTickSolve = action(() => {
    this.solve = this.tickSolve();
  });
}

export default Store;
export type {
  Status,
  Move,
};
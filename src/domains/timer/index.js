// @flow
import {
  extendObservable,
  action,
} from 'mobx';
import { List } from 'immutable';
// eslint-disable-next-line no-unused-vars
import type Database, { Solve as SolveJson } from 'database';
import Solve from './solve';
import type { Move } from './scramble';
import _scramble from './scramble';

type Status = 'idle' | 'inspecting' | 'solving';

function scramble(): List<Move> {
  return List(_scramble());
}

function serialize(solve: Solve): any {
  const json = solve.toJS();
  delete json.id;
  return json;
}

const observables = {
  solves: List(),
  scramble: scramble(),
  solve: Solve.build(),
  status: 'idle',
};

class Timer {
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

  _requestSolves = (): Promise<List<Solve>> => {
    return this.db.requestSolves()
      .then((solves) => {
        return List(solves).map((json) =>
          Solve.fromJson(json)
        );
      });
  }

  requestSolves = action('request-solves', (): Promise<List<Solve>> => {
    return this._requestSolves()
      .then(action((solves) => {
        this.solves = solves;
        return solves;
      }));
  });

  requestNewScramble = action('request-new-scramble', () => {
    this.scramble = scramble();
  });

  requestNewSolve = action('request-new-solve', () => {
    this.solve = Solve.build();
  });

  requestStartInspecting = action('request-start-inspecting', () => {
    this.solve = this.solve.setStart(Date.now());
    this.status = 'inspecting';
  });

  tickInspection = () => {
    return this.solve.setInspectionTime(
      Date.now() - this.solve.start
    );
  }

  requestStartSolving = action('request-start-solving', () => {
    this.solve = this.tickInspection();
    this.status = 'solving';
  });

  requestStopSolving = action('request-stop-solving', () => {
    this.solve = this
      .tickSolve()
      .setScramble(this.scramble);

    this.db.createSolve(serialize(this.solve))
      .then(action((id) => {
        this.solves = this.solves.unshift(
          this.solve.setId(id)
        );
        this.scramble = scramble();
        this.status = 'idle';
      }));
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

  requestTickInspection = action('request-tick-inspection', () => {
    this.solve = this.tickInspection();
  });

  requestTickSolve = action('request-tick-solve', () => {
    this.solve = this.tickSolve();
  });

  requestDeleteSolve = action('request-delete-solve', (id: ?number) => {
    if (!id) { return; }

    this.db.deleteSolve(id);
    this.solves = this.solves.filterNot((solve) => {
      return solve.getId() === id;
    });
  });
}

export default Timer;
export type {
  Status,
  Move,
};
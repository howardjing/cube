// @flow
import { fromJS, Record, List } from 'immutable';
import type { Solve as SolveJson } from 'database';
import type { Move } from './scramble';

// TODO: figure out how to add types to this
class Solve extends Record({
  id: null,
  start: null,
  inspectionTime: null,
  solveTime: null,
  scramble: List(),
  tags: List(),
}) {
  static fromJson(json: SolveJson): Solve {
    return new Solve(fromJS(json));
  }

  static build(): Solve {
    return new Solve();
  }

  getId(): ?number {
    return this.get('id');
  }

  setId(id: number): Solve {
    return this.set('id', id);
  }

  setScramble(scramble: List<Move>): Solve {
    return this.set('scramble', scramble);
  }

  setStart(timestamp: number): Solve {
    return this.set('start', timestamp);
  }

  setInspectionTime(millis: number): Solve {
    return this.set('inspectionTime', millis);
  }

  getSolveTime(): ?number {
    return this.get('solveTime');
  }

  setSolveTime(millis: number): Solve {
    return this.set('solveTime', millis);
  }
}

export default Solve;
// @flow
import { fromJS, Record, List } from 'immutable';
import type { Solve as SolveJson } from '../../database';

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

  setStart(timestamp: number): Solve {
    return this.set('start', timestamp);
  }

  setInspectionTime(millis: number): Solve {
    return this.set('inspectionTime', millis);
  }

  setSolveTime(millis: number): Solve {
    return this.set('solveTime', millis);
  }
}

export default Solve;
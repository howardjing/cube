// @flow
import type { Solve as SolveJson } from '../../database';
import scramble from './scramble';
import type { Move } from './scramble';

class Solve {
  id: ?number;
  start: ?number;
  inspectionTime: ?number;
  solveTime: ?number;
  scramble: Move[];
  tags: string[];

  constructor() {
    this.scramble = scramble();
    this.tags = [];
  }

  static fromJson(json: SolveJson) {
    const solve = new Solve();
    solve.id = json.id;
    solve.start = json.start;
    solve.inspectionTime = json.inspectionTime;
    solve.solveTime = json.solveTime;
    solve.scramble = json.scramble;
    solve.tags = json.tags;
    return solve;
  }
}

export default Solve;
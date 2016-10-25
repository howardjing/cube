// @flow
import type { Solve as SolveJson } from '../database';

class Solve {
  id: ?number;
  start: ?number;
  inspectionTime: ?number;
  solveTime: ?number;
  scramble: string[];
  tags: string[];

  constructor() {
    this.scramble = ['F', 'U'];
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
// @flow
import type { Solve as SolveJson } from '../database';

class Solve {
  id: ?number;
  start: ?number;
  inspectionTime: ?number;
  solveTime: ?number;
  scramble: string[];
  tags: string[];

  constructor(json: SolveJson) {
    this.id = json.id;
    this.start = json.start;
    this.inspectionTime = json.inspectionTime;
    this.solveTime = json.solveTime;
    this.scramble = json.scramble;
    this.tags = json.tags;
  }
}

export default Solve;
// @flow
import Dexie from 'dexie';
import type { Move } from '../store/solve';
type Solve = {
  id: number,
  start: number,
  inspectionTime: number,
  solveTime: number,
  scramble: Move[],
  tags: string[],
};

class Database {
  db: Dexie;

  constructor(name: string = 'cuber') {
    this.db = new Dexie(name);
    this.db.version(1).stores({
      solves: '++id,start,solveTime',
    });
  }

  requestSolves = (): Promise<Solve[]> => {
    return this.db.solves
      .orderBy('start')
      .reverse()
      .toArray();
  }

  createSolve = (solve: Solve): Promise<number> => {
    return this.db.solves.add(solve);
  }
}

export default Database;
export type {
  Solve
};
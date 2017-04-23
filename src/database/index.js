// @flow
import Dexie from 'dexie';
import type { Move } from '../domains/timer';

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

  deleteSolve = (id: number): Promise<number> => {
    return this.db.solves.delete(id)
      .then(() => {
        return id;
      });
  }
}

export default Database;
export type {
  Solve
};
// @flow
import Dexie from 'dexie';

type Solve = {
  id: number,
  start: number,
  inspectionTime: number,
  solveTime: number,
  scramble: string[],
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
}

export default Database;
export type {
  Solve
};
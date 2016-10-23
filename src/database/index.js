// @flow
import Dexie from 'dexie';

class Database {
  db: Dexie;

  constructor(name: string = 'cuber') {
    this.db = new Dexie(name);
    this.db.version(1).stores({
      solves: '++id,start,solveTime',
    });
  }

  requestSolves = (): Promise<any[]> => {
    return this.db.solves
      .orderBy('start')
      .reverse()
      .toArray();
  }
}

export default Database;
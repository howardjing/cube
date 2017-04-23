// @flow
import type Database from '../database';
import Timer from './timer';
import Routes from './routes';

class Store {
  timer: Timer;
  routes: Routes;

  constructor(db: Database) {
    this.timer = new Timer(db);
    this.routes = new Routes(this);
  }
}

export default (db: Database) => new Store(db);
export { Store };
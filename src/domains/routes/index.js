// @flow
import {
  extendObservable,
  action,
  computed,
} from 'mobx';
import { Store } from '../create-store';

export type Route =
    'timer'
  | 'tutorial';

class Routes {
  store: Store;
  currentRoute: ?Route;
  currentPath: any;

  // keep in sync with changeRoute and getPath
  PATHS = {
    '/timer': () => this.showTimer(),
    '/tutorial': () => this.showTutorial(),
  };

  constructor(store: Store) {
    this.store = store;
    extendObservable(this, {
      // the route name
      currentRoute: null,

      // corresponding window.location.pathname
      currentPath: computed(() => (
        this.getPath(this.currentRoute)
      )),
    });

    const path = window.location.pathname;
    const fn = this.PATHS[path];
    if (fn) {
      fn()
    } else {
      this.changeRoute('timer');
    }
  }

  showTimer = action('show-timer', () => {
    this.store.timer.requestSolves();
    this.currentRoute = 'timer';
  });

  showTutorial = action('show-tutorial', () => {
    this.currentRoute = 'tutorial';
  });

  // keep in sync with PATHS and getPath
  changeRoute = (route: Route) => {
    switch (route) {
      case 'timer':
        return this.showTimer();
      case 'tutorial':
        return this.showTutorial();
      default:
        break;
    }
  }

  // keep in sync with PATHS and changeRoute
  getPath = (route: ?Route): string => {
    switch (route) {
      case 'timer':
        return '/timer';
      case 'tutorial':
        return '/tutorial';
      default:
        return '';
    }
  }
}

export default Routes;
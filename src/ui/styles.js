// @flow

import { StyleSheet } from 'aphrodisiac';
import { styles as solveStyles } from './solve-time';
import merge from './styles/merge';

const app = {
  textAlign: 'center',
};

const appLogo = {
  height: '80px',
};

const appHeader = {
  backgroundColor: '#222',
  height: '150px',
  padding: '20px',
  color: 'white',
};

const appIntro = {
  fontSize: 'large',
};

const timer = merge(solveStyles.time, {
  fontSize: '72px',
});

const styles: {
  app: StyleSheetProp,
  appLogo: StyleSheetProp,
  appHeader: StyleSheetProp,
  appIntro: StyleSheetProp,
  timer: StyleSheetProp,
} = StyleSheet.create({
  app,
  appLogo,
  appHeader,
  appIntro,
  timer,
});

export default styles;

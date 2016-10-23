// @flow

import { StyleSheet } from 'aphrodisiac';
import { styles as solveStyles } from './solve-time';
import merge from './styles/merge';

const container = {
  display: 'flex',
  flex: '1',
  paddingTop: '40px',
  backgroundColor: 'salmon'
};

const primary = {
  flex: '3',
  display: 'flex',
  backgroundColor: 'pink',
  textAlign: 'center',
};

const secondary = {
  flex: '1',
  backgroundColor: 'purple',
  textAlign: 'center',
};

const offset = {
  backgroundColor: 'cyan',
  flex: '1',
};

const currentSolve = {
  display: 'flex',
  flex: '2',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'cornsilk',
}

const scramble = {
  backgroundColor: 'grey'
}

const solveTime = merge(solveStyles.time, {
  fontSize: '72px',
  backgroundColor: 'magenta',
});


const styles: {
  container: StyleSheetProp,
  primary: StyleSheetProp,
  secondary: StyleSheetProp,
  offset: StyleSheetProp,
  currentSolve: StyleSheetProp,
  scramble: StyleSheetProp,
  solveTime: StyleSheetProp,
} = StyleSheet.create({
  container,
  primary,
  secondary,
  offset,
  currentSolve,
  scramble,
  solveTime,
});

export default styles;

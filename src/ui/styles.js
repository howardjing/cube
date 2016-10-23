// @flow

import { StyleSheet } from 'aphrodisiac';
import { styles as solveStyles } from './solve-time';
import merge from './styles/merge';

const container = {
  flex: '1',
  padding: '20px',
  backgroundColor: 'salmon'
};

const primary = {
  display: 'flex',
  backgroundColor: 'pink',
  textAlign: 'center',
  height: '100%',
};

const secondary = {
  position: 'fixed',
  top: '20px',
  right: '20px',
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
  currentSolve: StyleSheetProp,
  scramble: StyleSheetProp,
  solveTime: StyleSheetProp,
} = StyleSheet.create({
  container,
  primary,
  secondary,
  currentSolve,
  scramble,
  solveTime,
});

export default styles;

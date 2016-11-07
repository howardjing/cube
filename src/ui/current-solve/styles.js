// @flow

import { StyleSheet } from 'aphrodisiac';
import { styles as solveStyles } from '../_common/solve-time';
import merge from '../_common/styles/merge';

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

const timer = merge(solveStyles.time, {
  fontSize: '72px',
  backgroundColor: 'magenta',
});

const rescramble = {
  cursor: 'pointer',
};

const styles: {
  currentSolve: StyleSheetProp,
  scramble: StyleSheetProp,
  timer: StyleSheetProp,
  rescramble: StyleSheetProp,
} = StyleSheet.create({
  currentSolve,
  scramble,
  timer,
  rescramble,
});

export default styles;

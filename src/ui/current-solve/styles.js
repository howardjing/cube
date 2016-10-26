// @flow

import { StyleSheet } from 'aphrodisiac';
import { styles as solveStyles } from '../_common/solve-time';
import merge from '../_common/styles/merge';
import theme from '../_common/styles/theme';

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

const rescramble = {
  cursor: 'pointer',
};

const styles: {
  currentSolve: StyleSheetProp,
  scramble: StyleSheetProp,
  solveTime: StyleSheetProp,
  rescramble: StyleSheetProp,
} = StyleSheet.create({
  currentSolve,
  scramble,
  solveTime,
  rescramble,
});

export default styles;

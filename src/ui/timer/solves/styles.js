// @flow
import { StyleSheet } from 'aphrodite';
import merge from 'ui/_styles/merge';
import { styles as solveStyles } from '../_common/solve-time';

const solveTime = merge(solveStyles.time, {
  display: 'inline',
});

const deleteIcon = {
  cursor: 'pointer',
}

const styles: {
  solveTime: StyleSheetProp,
  deleteIcon: StyleSheetProp,
} = StyleSheet.create({
  solveTime,
  deleteIcon,
});

export default styles;

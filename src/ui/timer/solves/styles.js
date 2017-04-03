// @flow
import { StyleSheet } from 'aphrodisiac';
import { styles as solveStyles } from '../../_common/solve-time';
import merge from '../../_common/_styles/merge';

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

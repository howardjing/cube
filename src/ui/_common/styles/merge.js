// @flow
import _ from 'lodash';

const merge = (base: StyleSheetProp, extensions: any): any => (
  _.merge({}, base.style, extensions)
);

export default merge;
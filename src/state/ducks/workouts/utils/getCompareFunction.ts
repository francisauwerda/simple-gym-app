import { GlobalWorkoutSettings } from '../types';
import {
  compareNameDesc, compareNameAsc, compareLastModifiedDesc, compareLastModifiedAsc,
} from '.';

const getCompareFunction = (globalWorkoutSettings: GlobalWorkoutSettings) => {
  const { sorting, direction } = globalWorkoutSettings;

  if (sorting === 'name') {
    return direction === 'DESC' ? compareNameDesc : compareNameAsc;
  }

  // default is lastModified
  return direction === 'DESC' ? compareLastModifiedDesc : compareLastModifiedAsc;
};

export default getCompareFunction;

import { GlobalWorkoutSettings, Sorting, Direction } from '../types';
import {
  compareLastModifiedAsc, compareLastModifiedDesc, compareNameAsc, compareNameDesc,
} from './compareFunctions';

const getCompareFunction = (globalWorkoutSettings: GlobalWorkoutSettings) => {
  const { sorting, direction } = globalWorkoutSettings;

  if (sorting === Sorting.name) {
    return direction === Direction.DESC ? compareNameDesc : compareNameAsc;
  }

  // default is lastModified
  return direction === Direction.DESC ? compareLastModifiedDesc : compareLastModifiedAsc;
};

export default getCompareFunction;

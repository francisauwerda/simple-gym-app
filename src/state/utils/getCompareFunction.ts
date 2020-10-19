import { Direction, Settings, Sorting } from '../types';
import {
  compareLastModifiedAsc, compareLastModifiedDesc, compareNameAsc, compareNameDesc,
} from './compareFunctions';

const getCompareFunction = (settings?: Settings) => {
  if (!settings) return compareNameAsc;

  const { sorting, direction } = settings;

  if (sorting === Sorting.name) {
    return direction === Direction.DESC ? compareNameDesc : compareNameAsc;
  }

  if (sorting === Sorting.lastModified) {
    return direction === Direction.DESC ? compareLastModifiedDesc : compareLastModifiedAsc;
  }

  return compareNameAsc;
};

export default getCompareFunction;

import { WorkoutWithLastModified } from '../types';

const compareLastModifiedAsc = (a: WorkoutWithLastModified, b: WorkoutWithLastModified) => {
  if (a.lastModified > b.lastModified) {
    return -1;
  }

  if (a.lastModified < b.lastModified) {
    return 1;
  }

  return 0;
};

export default compareLastModifiedAsc;

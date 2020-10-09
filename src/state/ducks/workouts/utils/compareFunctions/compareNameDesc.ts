import { WorkoutWithLastModified } from '../../types';

const compareNameDesc = (a: WorkoutWithLastModified, b: WorkoutWithLastModified) => {
  if (a.name > b.name) {
    return -1;
  }

  if (a.name < b.name) {
    return 1;
  }

  return 0;
};

export default compareNameDesc;
import { WorkoutWithLastModified, GlobalWorkoutSettings } from '../types';
import getCompareFunction from './getCompareFunction';

const sortWorkoutsWithLastModified = (
  workoutsWithLastModified: WorkoutWithLastModified[],
  globalWorkoutSettings: GlobalWorkoutSettings,
) => {
  const compareFunction = getCompareFunction(globalWorkoutSettings);
  const sorted = workoutsWithLastModified.sort(compareFunction);

  return sorted;
};
export default sortWorkoutsWithLastModified;

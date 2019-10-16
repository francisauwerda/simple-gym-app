import { Workout } from '../state/ducks/workouts/types';

const getNextHighestId = (workouts: Workout[]): number => {
  const highestId = workouts.map((w) => w.id).sort().pop();
  return highestId + 1;
};

export default {
  getNextHighestId,
};

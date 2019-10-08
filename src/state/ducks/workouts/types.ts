export interface Workout {
  id: number,
  name: string
}

const FETCH = 'workouts/FETCH';
const CHANGE_COLOUR = 'workouts/CHANGE_COLOUR';

export default {
  FETCH,
  CHANGE_COLOUR,
};

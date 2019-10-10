export interface Workout {
  id: number,
  name: string
}

const FETCH = 'workouts/FETCH';
const FETCH_SUCCESS = 'workouts/FETCH_SUCCESS';

export default {
  FETCH,
  FETCH_SUCCESS,
};

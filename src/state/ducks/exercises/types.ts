import { Workout } from '../workouts/types';

export interface Exercise {
  id: number,
  name: string,
  workoutId: Workout['id']
}

const FETCH = 'exercises/FETCH';
const FETCH_SUCCESS = 'exercises/FETCH_SUCCESS';

export default {
  FETCH,
  FETCH_SUCCESS,
};

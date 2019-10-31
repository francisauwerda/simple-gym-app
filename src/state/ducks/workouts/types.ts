export type Workout = {
  id: string
} & WorkoutDetails

export interface WorkoutDetails {
  name: string
}

const FETCH = 'workouts/FETCH';
const FETCH_SUCCESS = 'workouts/FETCH_SUCCESS';
const ADD = 'workouts/ADD';
const ADD_SUCCESS = 'workouts/ADD_SUCCESS';
const ADD_FAILURE = 'workouts/ADD_FAILURE';

export default {
  FETCH,
  FETCH_SUCCESS,
  ADD,
  ADD_SUCCESS,
  ADD_FAILURE,
};

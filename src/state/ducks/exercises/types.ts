import { Workout } from '../workouts/types';
import { Set } from '../sets/types';

export type Exercise = {
  id: string,
} & ExerciseDetails

export interface ExerciseDetails {
  name: string,
  workoutId: Workout['id']
}

export type ExerciseWithLastModified = {
  lastModified: Set['date']
} & Exercise;

const FETCH = 'exercises/FETCH';
const FETCH_SUCCESS = 'exercises/FETCH_SUCCESS';

const ADD = 'exercises/ADD';
const ADD_SUCCESS = 'exercises/ADD_SUCCESS';
const ADD_FAILURE = 'exercises/ADD_FAILURE';

const DELETE = 'exercises/DELETE';
const DELETE_SUCCESS = 'exercises/DELETE_SUCCESS';
const DELETE_FAILURE = 'exercises/DELETE_FAILURE';

const EDIT = 'exercises/EDIT';
const EDIT_SUCCESS = 'exercises/EDIT_SUCCESS';
const EDIT_FAILURE = 'exercises/EDIT_FAILURE';

export default {
  FETCH,
  FETCH_SUCCESS,
  ADD,
  ADD_SUCCESS,
  ADD_FAILURE,
  DELETE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  EDIT,
  EDIT_SUCCESS,
  EDIT_FAILURE,
};

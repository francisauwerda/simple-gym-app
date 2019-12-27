import { Set } from '../sets/types';

export type Workout = {
  id: string
} & WorkoutDetails

export interface WorkoutDetails {
  name: string
}

export type WorkoutWithLastModified = {
  lastModified: Set['date']
} & Workout;

const FETCH = 'workouts/FETCH';
const FETCH_SUCCESS = 'workouts/FETCH_SUCCESS';

const ADD = 'workouts/ADD';
const ADD_SUCCESS = 'workouts/ADD_SUCCESS';
const ADD_FAILURE = 'workouts/ADD_FAILURE';

const DELETE = 'workouts/DELETE';
const DELETE_SUCCESS = 'workouts/DELETE_SUCCESS';
const DELETE_FAILURE = 'workouts/DELETE_FAILURE';

const EDIT = 'workouts/EDIT';
const EDIT_SUCCESS = 'workouts/EDIT_SUCCESS';
const EDIT_FAILURE = 'workouts/EDIT_FAILURE';

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

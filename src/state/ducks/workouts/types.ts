import { Settings } from '../../types';
import { Set } from '../sets/types';

export interface WorkoutDetails {
  name: string
  exerciseSettings?: Settings
}

export type Workout = {
  id: string
} & WorkoutDetails

export type WorkoutWithLastModified = {
  lastModified: Set['date']
} & Workout;

export type GlobalWorkoutSettings = Settings

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

const FETCH_GLOBAL_WORKOUT_SETTINGS = 'workouts_settings/FETCH';
const FETCH_GLOBAL_WORKOUT_SETTINGS_SUCCESS = 'workouts_settings/FETCH_SUCCESS';

const SET_GLOBAL_WORKOUT_SETTINGS = 'workouts_settings/SET';
const SET_GLOBAL_WORKOUT_SETTINGS_SUCCESS = 'workouts_settings/SET_SUCCESS';

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
  FETCH_GLOBAL_WORKOUT_SETTINGS,
  FETCH_GLOBAL_WORKOUT_SETTINGS_SUCCESS,
  SET_GLOBAL_WORKOUT_SETTINGS,
  SET_GLOBAL_WORKOUT_SETTINGS_SUCCESS,
};

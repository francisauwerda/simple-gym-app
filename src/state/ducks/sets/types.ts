import { Moment } from 'moment';
import { Exercise } from '../exercises/types';

export enum Difficulty {
  EASY,
  MODERATE,
  HARD
}

export type Set = {
  id: string
} & SetDetails

export type SetDetails = {
  reps: number,
  weight: number,
  difficulty: Difficulty,
  date: Moment,
  exerciseId: Exercise['id']
}

const FETCH = 'sets/FETCH';
const FETCH_SUCCESS = 'sets/FETCH_SUCCESS';

const ADD = 'sets/ADD';
const ADD_SUCCESS = 'sets/ADD_SUCCESS';
const ADD_FAILURE = 'sets/ADD_FAILURE';

const DELETE = 'sets/DELETE';
const DELETE_SUCCESS = 'sets/DELETE_SUCCESS';
const DELETE_FAILURE = 'sets/DELETE_FAILURE';

const EDIT = 'sets/EDIT';
const EDIT_SUCCESS = 'sets/EDIT_SUCCESS';
const EDIT_FAILURE = 'sets/EDIT_FAILURE';

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

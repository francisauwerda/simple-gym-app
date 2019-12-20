import { Moment } from 'moment';
import { Exercise } from '../exercises/types';

export type Set = {
  id: string
} & SetDetails

export interface SetDetails {
  reps: number,
  weight: number,
  difficulty: number,
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

export default {
  FETCH,
  FETCH_SUCCESS,
  ADD,
  ADD_SUCCESS,
  ADD_FAILURE,
  DELETE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
};

/* eslint-disable import/prefer-default-export */
import { AppState } from '../types';
import { initialState as exercisesInitialState } from '../ducks/exercises/reducers';
import { initialState as setsInitialState } from '../ducks/sets/reducers';
import { initialState as workoutsInitialState } from '../ducks/workouts/reducers';

export const getDefaultState = (override?: Partial<AppState>): AppState => {
  const defaultState = {
    exercisesReducer: {
      ...exercisesInitialState,
    },
    setsReducer: {
      ...setsInitialState,
    },
    workoutsReducer: {
      ...workoutsInitialState,
    },
  };

  const merged = {
    ...defaultState,
    ...override,
  };

  return merged;
};

import { ExerciseWithLastModified } from './ducks/exercises/types';
import { WorkoutWithLastModified } from './ducks/workouts/types';
import { rootReducer } from './store';

export type AppState = ReturnType<typeof rootReducer>;

export enum Sorting {
  lastModified = 'lastModified',
  name = 'name'
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface Settings {
  sorting: Sorting;
  direction: Direction;
}

export type SortableItem = WorkoutWithLastModified | ExerciseWithLastModified;

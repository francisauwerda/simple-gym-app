import { Exercise } from './ducks/exercises/types';
import { Set } from './ducks/sets/types';
import { Workout } from './ducks/workouts/types';

export interface State {
  exercises: Exercise[],
  sets: Set[],
  workouts: {
    colourReducer: { colour: string },
    workoutsReducer: Workout[],
  }
}

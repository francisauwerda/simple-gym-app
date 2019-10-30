import { Exercise } from './ducks/exercises/types';
import { Set } from './ducks/sets/types';
import { Workout } from './ducks/workouts/types';

export interface State {
  exercisesReducer: { exercises: Exercise[] },
  setsReducer: Set[],
  workoutsReducer: {
    workouts: Workout[],
  }
}

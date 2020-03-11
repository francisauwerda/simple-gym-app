import moment from 'moment';
import { Set, Difficulty } from '../../state/ducks/sets/types';
import { Workout } from '../../state/ducks/workouts/types';
import { Exercise } from '../../state/ducks/exercises/types';


const defaultWorkouts: Workout[] = [{
  id: 'w1',
  name: 'Legs',
}, {
  id: 'w2',
  name: 'Chest',
}, {
  id: 'w3',
  name: 'Back',
}];

const defaultExercises: Exercise[] = [{
  id: 'e1',
  name: 'Squats',
  workoutId: 'w1',
}, {
  id: 'e2',
  name: 'Deadlifts',
  workoutId: 'w1',
}, {
  id: 'e3',
  name: 'Calf raises',
  workoutId: 'w1',
}, {
  id: 'e4',
  name: 'Bench press',
  workoutId: 'w2',
}, {
  id: 'e5',
  name: 'WG Lat pulldown',
  workoutId: 'w3',
}];

const defaultSets: Set[] = [{
  id: 's1',
  exerciseId: 'e1',
  reps: 8,
  weight: 80,
  difficulty: Difficulty.Easy,
  date: moment('2020-03-10'),
}, {
  id: 's2',
  exerciseId: 'e1',
  reps: 8,
  weight: 90,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-10'),
}, {
  id: 's3',
  exerciseId: 'e1',
  reps: 8,
  weight: 70,
  difficulty: Difficulty.Easy,
  date: moment('2020-03-03'),
}, {
  id: 's11',
  exerciseId: 'e1',
  reps: 8,
  weight: 80,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-03'),
}, {
  id: 's12',
  exerciseId: 'e1',
  reps: 8,
  weight: 90,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-03'),
}, {
  id: 's8',
  exerciseId: 'e1',
  reps: 8,
  weight: 100,
  difficulty: Difficulty.Hard,
  date: moment(),
}, {
  id: 's4',
  exerciseId: 'e2',
  reps: 8,
  weight: 100,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-10'),
}, {
  id: 's5',
  exerciseId: 'e3',
  reps: 8,
  weight: 100,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-10'),
}, {
  id: 's6',
  exerciseId: 'e4',
  reps: 8,
  weight: 100,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-08'),
}, {
  id: 's7',
  exerciseId: 'e5',
  reps: 8,
  weight: 100,
  difficulty: Difficulty.Moderate,
  date: moment('2020-03-06'),
}];

// eslint-disable-next-line import/prefer-default-export
export const defaults = {
  workouts: defaultWorkouts,
  exercises: defaultExercises,
  sets: defaultSets,
};

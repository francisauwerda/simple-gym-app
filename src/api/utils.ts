import uuid from 'uuidv4';
import { Workout } from '../state/ducks/workouts/types';
import { Exercise } from '../state/ducks/exercises/types';

const getId = (): string => uuid();
const legsId = uuid();
const shouldersId = uuid();

const defaultWorkouts: Workout[] = [{
  id: legsId,
  name: 'legs',
}, {
  id: shouldersId,
  name: 'shoulders',
}];

const getDefaultExercises = (): Exercise[] => [{
  id: uuid(),
  name: 'squats',
  workoutId: defaultWorkouts[0].id,
}, {
  id: uuid(),
  name: 'rdl',
  workoutId: defaultWorkouts[0].id,
}, {
  id: uuid(),
  name: 'shoulder press',
  workoutId: defaultWorkouts[1].id,
}];

const getDefaultWorkouts = (): Workout[] => defaultWorkouts;

export default {
  getId,
  getDefaultExercises,
  getDefaultWorkouts,
};

import uuid from 'uuidv4';
import { Workout } from '../state/ducks/workouts/types';
import { Exercise } from '../state/ducks/exercises/types';
import { Set } from '../state/ducks/sets/types';

const getId = (): string => uuid();
const legsId = uuid();
const shouldersId = uuid();

const squatsId = uuid();
const rdlId = uuid();
const shoulderPressId = uuid();

const defaultData = {
  workouts: [{
    id: legsId,
    name: 'legs',
  }, {
    id: shouldersId,
    name: 'shoulders',
  }],

  exercises: [{
    id: squatsId,
    name: 'squats',
    workoutId: legsId,
  }, {
    id: rdlId,
    name: 'rdl',
    workoutId: legsId,
  }, {
    id: shoulderPressId,
    name: 'shoulder press',
    workoutId: shouldersId,
  }],

  sets: [{
    id: uuid(),
    reps: 10,
    date: '11-11-2019', // TODO: Change to moment with time precision
    difficulty: 4,
    weight: 100,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 10,
    date: '11-11-2019',
    difficulty: 4,
    weight: 100,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 8,
    date: '11-11-2019',
    difficulty: 5,
    weight: 100,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 8,
    date: '11-11-2019',
    difficulty: 5,
    weight: 90,
    exerciseId: squatsId,
  }],
};

const defaultWorkouts: Workout[] = defaultData.workouts;

const defaultExercises: Exercise[] = defaultData.exercises;

const defaultSets: Set[] = defaultData.sets;

const getDefaultWorkouts = (): Workout[] => defaultWorkouts;
const getDefaultExercises = (): Exercise[] => defaultExercises;
const getDefaultSets = (): Set[] => defaultSets;

export default {
  getId,
  getDefaultExercises,
  getDefaultWorkouts,
  getDefaultSets,
};

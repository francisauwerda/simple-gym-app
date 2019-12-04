import uuid from 'uuidv4';
import moment from 'moment';

import { Workout } from '../state/ducks/workouts/types';
import { Exercise } from '../state/ducks/exercises/types';
import { Set } from '../state/ducks/sets/types';

const getId = (): string => uuid();
const legsId = uuid();
const shouldersId = uuid();

const squatsId = uuid();
const rdlId = uuid();
const shoulderPressId = uuid();

const thisMonth = moment('2019-11-11');
const thisMonth2 = thisMonth.clone().add(1, 'hour');
const thisMonth3 = thisMonth.clone().add(2, 'hour');
const yesterday = thisMonth.clone().subtract(1, 'day');
const lastMonth = thisMonth.clone().subtract(1, 'M');

const defaultData = {
  workouts: [{
    id: legsId,
    name: 'Legs',
  }, {
    id: shouldersId,
    name: 'Shoulders',
  }],

  exercises: [{
    id: squatsId,
    name: 'Squats',
    workoutId: legsId,
  }, {
    id: rdlId,
    name: 'RDL',
    workoutId: legsId,
  }, {
    id: shoulderPressId,
    name: 'Shoulder Press',
    workoutId: shouldersId,
  }],

  sets: [{
    id: uuid(),
    reps: 10,
    date: lastMonth,
    difficulty: 4,
    weight: 100,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 10,
    date: thisMonth,
    difficulty: 4,
    weight: 100,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 8,
    date: yesterday,
    difficulty: 5,
    weight: 100,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 8,
    date: thisMonth2,
    difficulty: 5,
    weight: 90,
    exerciseId: squatsId,
  }, {
    id: uuid(),
    reps: 8,
    date: thisMonth3,
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

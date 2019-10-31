import { AsyncStorage } from 'react-native';
import { Workout, WorkoutDetails } from '../state/ducks/workouts/types';
import utils from './utils';
import { Exercise, ExerciseDetails } from '../state/ducks/exercises/types';

const defaultWorkouts = [{
  id: 1,
  name: 'legs',
}, {
  id: 2,
  name: 'shoulders',
}];

const defaultExercises: Exercise[] = [{
  id: 1,
  name: 'squats',
  workoutId: 1,
}, {
  id: 2,
  name: 'rdl',
  workoutId: 1,
}, {
  id: 3,
  name: 'shoulder press',
  workoutId: 2,
}];

enum STORAGE_KEYS {
  Workouts = '@SimpleAppStorage_workouts',
  Exercises = '@SimpleAppStorage_exercises'
}

const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const workouts: string = await AsyncStorage.getItem(STORAGE_KEYS.Workouts);

    if (!workouts) {
      await AsyncStorage.setItem(STORAGE_KEYS.Workouts, JSON.stringify(defaultWorkouts));
      return defaultWorkouts;
    }

    return JSON.parse(workouts);
  } catch (error) {
    console.log('Error getting workouts', error);
    return [];
  }
};

const addWorkout = async (workout: WorkoutDetails): Promise<Workout[]> => {
  try {
    const workouts: Workout[] = await getWorkouts();

    const id = utils.getNextHighestId(workouts);

    const newWorkout = { ...workout, id };
    const newWorkouts = [...workouts, newWorkout];

    await AsyncStorage.setItem(STORAGE_KEYS.Workouts, JSON.stringify(newWorkouts));
    return newWorkouts;
  } catch (error) {
    console.log('Error adding workout', error);
    return [];
  }
};

const resetWorkouts = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.Workouts);
};

const getExercises = async (workoutId: Exercise['workoutId']): Promise<Exercise[]> => {
  try {
    const allExercises: string = await AsyncStorage.getItem(STORAGE_KEYS.Exercises);

    if (!allExercises) {
      await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify(defaultExercises));
      return defaultExercises;
    }

    const parsedExercises: Exercise[] = JSON.parse(allExercises);
    const exercises = parsedExercises.filter((exercise) => exercise.workoutId === workoutId);

    return exercises;
  } catch (error) {
    console.log('Error getting exercises', error);
    return [];
  }
};

const addExercise = async (exercise: ExerciseDetails): Promise<Exercise[]> => {
  try {
    const exercises: Exercise[] = await getExercises(exercise.workoutId);
    const id = utils.getNextHighestId(exercises); // TODO: add UUID

    const newExercise = { ...exercise, id };
    const newExercises = [...exercises, newExercise];

    await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify(newExercises));
    return newExercises;
  } catch (error) {
    console.log('Error adding exercise', error);
    return [];
  }
};

export default {
  getWorkouts,
  resetWorkouts,
  addWorkout,
  getExercises,
  addExercise,
};

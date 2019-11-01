import { AsyncStorage } from 'react-native';
import { Workout, WorkoutDetails } from '../state/ducks/workouts/types';
import utils from './utils';
import { Exercise, ExerciseDetails } from '../state/ducks/exercises/types';
import { Set, SetDetails } from '../state/ducks/sets/types';


enum STORAGE_KEYS {
  Workouts = '@SimpleAppStorage_workouts',
  Exercises = '@SimpleAppStorage_exercises',
  Sets = '@SimpleAppStorage_sets'
}

const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const workouts: string = await AsyncStorage.getItem(STORAGE_KEYS.Workouts);

    if (!workouts) {
      const defaultWorkouts = utils.getDefaultWorkouts();

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

    const id = utils.getId();

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
  await AsyncStorage.removeItem(STORAGE_KEYS.Exercises);
  await AsyncStorage.removeItem(STORAGE_KEYS.Sets);
};

const getExercises = async (workoutId?: Exercise['workoutId']): Promise<Exercise[]> => {
  try {
    const allExercises: string = await AsyncStorage.getItem(STORAGE_KEYS.Exercises);

    if (!allExercises) {
      const defaultExercises = utils.getDefaultExercises();
      await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify(defaultExercises));
      return defaultExercises;
    }

    const parsedExercises: Exercise[] = JSON.parse(allExercises);

    if (workoutId) {
      return parsedExercises.filter((exercise) => exercise.workoutId === workoutId);
    }

    return parsedExercises;
  } catch (error) {
    console.log('Error getting exercises', error);
    return [];
  }
};

const addExercise = async (exercise: ExerciseDetails): Promise<Exercise[]> => {
  try {
    const exercises: Exercise[] = await getExercises();
    const id = utils.getId();

    const newExercise = { ...exercise, id };
    const newExercises = [...exercises, newExercise];

    await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify(newExercises));
    return newExercises;
  } catch (error) {
    console.log('Error adding exercise', error);
    return [];
  }
};

const getSets = async (exerciseId?: Set['exerciseId']): Promise<Set[]> => {
  try {
    const allSets: string = await AsyncStorage.getItem(STORAGE_KEYS.Sets);
    console.log('aa', allSets);

    if (!allSets) {
      const defaultSets = utils.getDefaultSets();
      console.log('default', defaultSets);
      await AsyncStorage.setItem(STORAGE_KEYS.Sets, JSON.stringify(defaultSets));
      return defaultSets;
    }

    const parsedSets: Set[] = JSON.parse(allSets);

    if (exerciseId) {
      return parsedSets.filter((set) => set.exerciseId === exerciseId);
    }

    return parsedSets;
  } catch (error) {
    console.log('Error getting sets', error);
    return [];
  }
};

const addSet = async (set: SetDetails): Promise<Set[]> => {
  try {
    const sets: Set[] = await getSets();
    const id = utils.getId();

    const newSet = { ...set, id };
    const newSets = [...sets, newSet];

    await AsyncStorage.setItem(STORAGE_KEYS.Sets, JSON.stringify(newSets));
    return newSets;
  } catch (error) {
    console.log('Error adding set', error);
    return [];
  }
};

export default {
  getWorkouts,
  resetWorkouts,
  addWorkout,
  getExercises,
  addExercise,
  getSets,
  addSet,
};

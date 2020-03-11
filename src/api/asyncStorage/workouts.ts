import { AsyncStorage } from 'react-native';

import { Workout, WorkoutDetails } from '../../state/ducks/workouts/types';
import utils from '../utils';
import { STORAGE_KEYS } from './enums';
import { Exercise } from '../../state/ducks/exercises/types';
import { getExercises, deleteExercise } from './exercises';
// import { defaults } from './defaults';

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const workouts: string = await AsyncStorage.getItem(STORAGE_KEYS.Workouts);

    if (!workouts) {
      await AsyncStorage.setItem(STORAGE_KEYS.Workouts, JSON.stringify([]));
      return [];
    }

    return JSON.parse(workouts);
    // return defaults.workouts;
  } catch (error) {
    console.log('Error getting workouts', error);
    return [];
  }
};

export const addWorkout = async (workout: WorkoutDetails): Promise<Workout[]> => {
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

export const resetWorkouts = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.Workouts);
  await AsyncStorage.removeItem(STORAGE_KEYS.Exercises);
  await AsyncStorage.removeItem(STORAGE_KEYS.Sets);
};

export const deleteWorkout = async (id: Workout['id']): Promise<Workout[]> => {
  try {
    console.log(`Deleting workout with id: ${id}`);

    // Delete all dependent exercises first.
    const exerciseIds: Exercise['id'][] = (await getExercises(id)).map((exercise) => exercise.id);
    exerciseIds.forEach((exerciseId) => {
      console.log('DEBUG: delete exercise with id: ', exerciseId);
      deleteExercise(exerciseId);
    });

    const workouts = await getWorkouts();
    const filteredWorkouts = workouts.filter((workout) => workout.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.Workouts, JSON.stringify(filteredWorkouts));

    return filteredWorkouts;
  } catch (error) {
    console.log(`Error deleting workout with id: ${id}`, error);
    return [];
  }
};

export const editWorkout = async (id: Workout['id'], fields: WorkoutDetails): Promise<Workout> => {
  console.log(`Editing workout: ${id}`);
  const workouts = await getWorkouts();

  const workout = workouts.filter((w) => w.id === id)[0];

  if (!workout) {
    console.log('No workout found');
    throw new Error(`No workout found with id: ${id}`);
  }

  try {
    const updatedWorkout = {
      ...workout,
      ...fields,
    };

    const updatedWorkouts = workouts.map((w) => (w.id === id ? updatedWorkout : w));

    await AsyncStorage.setItem(STORAGE_KEYS.Workouts, JSON.stringify(updatedWorkouts));

    return updatedWorkout;
  } catch (error) {
    console.log(`Error editing workout: ${id}`, error);
    return workout;
  }
};

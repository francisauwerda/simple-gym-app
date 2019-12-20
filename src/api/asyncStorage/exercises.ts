import { AsyncStorage } from 'react-native';

import { Exercise, ExerciseDetails } from '../../state/ducks/exercises/types';
import utils from '../utils';
import { STORAGE_KEYS } from './enums';

export const getExercises = async (workoutId?: Exercise['workoutId']): Promise<Exercise[]> => {
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

export const addExercise = async (exercise: ExerciseDetails): Promise<Exercise[]> => {
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

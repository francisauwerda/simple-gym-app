import { AsyncStorage } from 'react-native';

import { Exercise, ExerciseDetails } from '../../state/ducks/exercises/types';
import utils from '../utils';
import { STORAGE_KEYS } from './enums';
import { Set } from '../../state/ducks/sets/types';
import { getSets, deleteSet } from './sets';
// import { defaults } from './defaults';


export const getExercises = async (workoutId?: Exercise['workoutId']): Promise<Exercise[]> => {
  try {
    const allExercises: string = await AsyncStorage.getItem(STORAGE_KEYS.Exercises);

    if (!allExercises) {
      await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify([]));
      return [];
    }

    const parsedExercises: Exercise[] = JSON.parse(allExercises);
    // const parsedExercises = defaults.exercises;

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

export const deleteExercise = async (id: Exercise['id']): Promise<Exercise[]> => {
  try {
    console.log(`Deleting exercise with id: ${id}`);

    // Delete all dependent sets first.
    const setIds: Set['id'][] = (await getSets(id)).map((set) => set.id);

    setIds.forEach((setId) => {
      console.log('DEBUG: delete set with id: ', setId);
      deleteSet(setId);
    });

    const exercises = await getExercises();
    const filteredExercises = exercises.filter((exercise) => exercise.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify(filteredExercises));

    return filteredExercises;
  } catch (error) {
    console.log(`Error deleting exercise with id: ${id}`, error);
    return [];
  }
};

export const editExercise = async (id: Exercise['id'], fields: ExerciseDetails): Promise<Exercise> => {
  console.log(`Editing exercise: ${id}`);
  const exercises = await getExercises();

  const exercise = exercises.filter((e) => e.id === id)[0];

  if (!exercise) {
    console.log('No exercise found');
    throw new Error(`No exercise found with id: ${id}`);
  }

  try {
    const updatedExercise = {
      ...exercise,
      ...fields,
    };

    const updatedExercises = exercises.map((e) => (e.id === id ? updatedExercise : e));

    await AsyncStorage.setItem(STORAGE_KEYS.Exercises, JSON.stringify(updatedExercises));

    return updatedExercise;
  } catch (error) {
    console.log(`Error editing exercise: ${id}`, error);
    return exercise;
  }
};

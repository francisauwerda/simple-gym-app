/* eslint-disable import/prefer-default-export */
import { Exercise } from '../state/ducks/exercises/types';
import asyncStorage from './asyncStorage';

export const getExercises = async (workoutId: Exercise['workoutId']): Promise<Exercise[]> => {
  const exercises = await asyncStorage.getExercises(workoutId);

  return exercises;
};

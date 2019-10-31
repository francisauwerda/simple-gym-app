/* eslint-disable import/prefer-default-export */
import { Exercise, ExerciseDetails } from '../state/ducks/exercises/types';
import asyncStorage from './asyncStorage';

export const getExercises = async (workoutId: Exercise['workoutId']): Promise<Exercise[]> => {
  const exercises = await asyncStorage.getExercises(workoutId);

  return exercises;
};

export const addExercise = async (exerciseDetails: ExerciseDetails): Promise<Exercise[]> => {
  const exercises: Exercise[] = await asyncStorage.addExercise(exerciseDetails);

  return exercises;
};

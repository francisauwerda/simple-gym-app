import { Exercise, ExerciseDetails } from '../state/ducks/exercises/types';
import asyncStorage from './asyncStorage';

export const getExercises = async (workoutId?: Exercise['workoutId']): Promise<Exercise[]> => {
  const exercises = await asyncStorage.exercises.getExercises(workoutId);

  return exercises;
};

export const addExercise = async (exerciseDetails: ExerciseDetails): Promise<Exercise[]> => {
  const exercises: Exercise[] = await asyncStorage.exercises.addExercise(exerciseDetails);

  return exercises;
};

export const deleteExercise = async (id: Exercise['id']): Promise<Exercise[]> => {
  const exercises = await asyncStorage.exercises.deleteExercise(id);

  return exercises;
};

export const editExercise = async (
  id: Exercise['id'],
  fields: ExerciseDetails,
): Promise<Exercise> => {
  const exercise = await asyncStorage.exercises.editExercise(id, fields);

  return exercise;
};

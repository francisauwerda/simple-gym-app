import { Workout, WorkoutDetails } from '../state/ducks/workouts/types';
import asyncStorage from './asyncStorage';

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await asyncStorage.getWorkouts();

  return workouts;
};

export const debugResetWorkouts = async (): Promise<void> => {
  await asyncStorage.resetWorkouts();
};

export const addWorkout = async (workoutDetails: WorkoutDetails): Promise<Workout[]> => {
  console.log('Adding workout...', workoutDetails);
  const workouts: Workout[] = await asyncStorage.addWorkout(workoutDetails);

  return workouts;
};

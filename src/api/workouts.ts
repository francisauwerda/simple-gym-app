import { Workout, WorkoutDetails } from '../state/ducks/workouts/types';
import asyncStorage from './asyncStorage';

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await asyncStorage.workouts.getWorkouts();

  return workouts;
};

export const debugResetWorkouts = async (): Promise<void> => {
  await asyncStorage.workouts.resetWorkouts();
};

export const addWorkout = async (workoutDetails: WorkoutDetails): Promise<Workout[]> => {
  const workouts: Workout[] = await asyncStorage.workouts.addWorkout(workoutDetails);

  return workouts;
};

export const deleteWorkout = async (id: Workout['id']): Promise<Workout[]> => {
  const workouts: Workout[] = await asyncStorage.workouts.deleteWorkout(id);

  return workouts;
};

export const editWorkout = async (id: Workout['id'], fields: Partial<WorkoutDetails>): Promise<Workout> => {
  console.log('Changing these fields', fields);

  return {
    id,
    name: 'changed',
  };
};

import { AsyncStorage } from 'react-native';
import { Workout, WorkoutDetails } from '../state/ducks/workouts/types';
import utils from './utils';

const defaultWorkouts = [{
  id: 1,
  name: 'legs',
}, {
  id: 2,
  name: 'shoulders',
}];

enum STORAGE_KEYS {
  Workouts = '@SimpleAppStorage_workouts'
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

export default {
  getWorkouts,
  resetWorkouts,
  addWorkout,
};

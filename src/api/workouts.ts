import { AsyncStorage } from 'react-native';
import { Workout } from '../state/ducks/workouts/types';

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

const getWorkoutsAsyncStorage = async (): Promise<Workout[]> => {
  try {
    const workouts: string = await AsyncStorage.getItem(STORAGE_KEYS.Workouts);

    if (!workouts) {
      await AsyncStorage.setItem(STORAGE_KEYS.Workouts, JSON.stringify(defaultWorkouts));
      return defaultWorkouts;
    }

    return JSON.parse(workouts);
  } catch (error) {
    return [];
  }
};

const resetWorkouts = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.Workouts);
};

// eslint-disable-next-line import/prefer-default-export
export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getWorkoutsAsyncStorage();

  return workouts;
};

export const debugResetWorkouts = async (): Promise<void> => {
  await resetWorkouts();
};

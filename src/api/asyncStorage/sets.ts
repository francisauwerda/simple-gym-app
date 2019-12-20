import { AsyncStorage } from 'react-native';

import { Set, SetDetails } from '../../state/ducks/sets/types';
import utils from '../utils';
import { STORAGE_KEYS } from './enums';

export const getSets = async (exerciseId?: Set['exerciseId']): Promise<Set[]> => {
  try {
    const allSets: string = await AsyncStorage.getItem(STORAGE_KEYS.Sets);

    if (!allSets) {
      const defaultSets = utils.getDefaultSets();
      await AsyncStorage.setItem(STORAGE_KEYS.Sets, JSON.stringify(defaultSets));
      return defaultSets;
    }

    const parsedSets: Set[] = JSON.parse(allSets);

    if (exerciseId) {
      return parsedSets.filter((set) => set.exerciseId === exerciseId);
    }

    return parsedSets;
  } catch (error) {
    console.log('Error getting sets', error);
    return [];
  }
};

export const addSet = async (set: SetDetails): Promise<Set[]> => {
  try {
    const sets: Set[] = await getSets();
    const id = utils.getId();

    const newSet = { ...set, id };
    const newSets = [...sets, newSet];

    await AsyncStorage.setItem(STORAGE_KEYS.Sets, JSON.stringify(newSets));
    return newSets;
  } catch (error) {
    console.log('Error adding set', error);
    return [];
  }
};

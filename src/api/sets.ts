import { Set, SetDetails } from '../state/ducks/sets/types';
import asyncStorage from './asyncStorage';

export const getSets = async (exerciseId: Set['exerciseId']): Promise<Set[]> => {
  const sets = await asyncStorage.getSets(exerciseId);
  return sets;
};

export const addSet = async (setDetails: SetDetails): Promise<Set[]> => {
  const sets: Set[] = await asyncStorage.addSet(setDetails);

  return sets;
};

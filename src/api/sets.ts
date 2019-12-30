import { Set, SetDetails } from '../state/ducks/sets/types';
import asyncStorage from './asyncStorage';

export const getSets = async (exerciseId?: Set['exerciseId']): Promise<Set[]> => {
  const sets = await asyncStorage.sets.getSets(exerciseId);
  return sets;
};

export const addSet = async (setDetails: SetDetails): Promise<Set[]> => {
  const sets: Set[] = await asyncStorage.sets.addSet(setDetails);
  return sets;
};

export const deleteSet = async (id: Set['id']): Promise<Set[]> => {
  const sets: Set[] = await asyncStorage.sets.deleteSet(id);
  return sets;
};

export const editSet = async (
  id: Set['id'],
  fields: Partial<SetDetails>,
): Promise<Set> => {
  console.log('Set: changing fields:', fields);

  return {
    id,
    reps: fields.reps,
    weight: fields.weight,
    date: fields.date,
    difficulty: fields.difficulty,
    exerciseId: fields.exerciseId,
  };
};

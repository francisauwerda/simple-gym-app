import types, { Set, SetDetails } from './types';

const fetchSets = (exerciseId: Set['exerciseId']) => ({
  type: types.FETCH,
  payload: { exerciseId },
});

const addSet = (set: SetDetails) => ({
  type: types.ADD,
  payload: set,
});

export default {
  fetchSets,
  addSet,
};

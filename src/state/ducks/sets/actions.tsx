import types, { Set, SetDetails } from './types';

const fetchSets = (exerciseId: Set['exerciseId']) => ({
  type: types.FETCH,
  payload: { exerciseId },
});

const addSet = (set: SetDetails) => ({
  type: types.ADD,
  payload: set,
});

const deleteSet = (id: Set['id']) => ({
  type: types.DELETE,
  payload: { id },
});

export default {
  fetchSets,
  addSet,
  deleteSet,
};

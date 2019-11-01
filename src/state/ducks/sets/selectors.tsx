import { State } from '../../types';
import { Set } from './types';

const selectSets = (state: State, exerciseId: Set['exerciseId']) => {
  const allSets = state.setsReducer.sets;
  return allSets.filter((s) => s.exerciseId === exerciseId);
};

export default {
  selectSets,
};

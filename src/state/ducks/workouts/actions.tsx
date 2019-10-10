// import everything from actions
// export everything from actions + all operations
import types from './types';

/**
 * I want an action which takes no parameters and calls the async storage to load
 * all of the stored workouts.
 */
const fetchWorkouts = () => ({
  type: types.FETCH,
});

export default {
  fetchWorkouts,
};

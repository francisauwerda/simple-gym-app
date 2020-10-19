/* eslint-disable no-undef */
import uuidv4 from 'uuidv4';

import { workoutsSelectors } from '..';
import { AppState, Direction, Sorting } from '../../../types';

const getState = (state: Partial<AppState>): AppState => ({
  workoutsReducer: {
    workouts: [
      ...state.workoutsReducer.workouts,
    ],
    globalWorkoutSettings: {
      ...state.workoutsReducer.globalWorkoutSettings,
    },
  },
  exercisesReducer: {
    exercises: [
      ...state.exercisesReducer.exercises,
    ],
  },
  setsReducer: {
    sets: [
      ...state.setsReducer.sets,
    ],
  },
});

describe('workouts selectors', () => {
  it('should return workouts sorted by name in asc order', () => {
    const state = getState({
      workoutsReducer: {
        workouts: [{
          id: uuidv4(),
          name: 'a-workout1',
        }, {
          id: uuidv4(),
          name: 'c-workout3',
        }, {
          id: uuidv4(),
          name: 'b-workout2',
        }],
        globalWorkoutSettings: {
          sorting: Sorting.name,
          direction: Direction.ASC,
        },
      },
      exercisesReducer: {
        exercises: [],
      },
      setsReducer: {
        sets: [],
      },
    });

    const sortedWorkouts = workoutsSelectors.selectWorkoutsWithLastModified(state);
    const workoutNames = sortedWorkouts.map((workout) => workout.name);
    expect(workoutNames).toEqual(['a-workout1', 'b-workout2', 'c-workout3']);
  });

  it('should return workouts sorted by name in desc', () => {
    const state = getState({
      workoutsReducer: {
        workouts: [{
          id: uuidv4(),
          name: 'a-workout1',
        },
        {
          id: uuidv4(),
          name: 'c-workout3',
        }, {
          id: uuidv4(),
          name: 'b-workout2',
        }],
        globalWorkoutSettings: {
          sorting: Sorting.name,
          direction: Direction.DESC,
        },
      },
      exercisesReducer: {
        exercises: [],
      },
      setsReducer: {
        sets: [],
      },
    });

    const sortedWorkouts = workoutsSelectors.selectWorkoutsWithLastModified(state);
    const workoutNames = sortedWorkouts.map((workout) => workout.name);
    expect(workoutNames).toEqual(['c-workout3', 'b-workout2', 'a-workout1']);
  });
});

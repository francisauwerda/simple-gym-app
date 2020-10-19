/* eslint-disable no-undef */
import moment from 'moment';

import { Exercise } from '../types';
import { exercisesSelectors } from '..';
import { getDefaultState } from '../../testHelpers';
import { Direction, Sorting } from '../../../types';
import { Workout } from '../../workouts/types';

describe('workout selectors', () => {
  describe('selectExercises()', () => {
    it('should return an array of exercises for a given workoutId', () => {
      const state = getDefaultState({
        exercisesReducer: {
          exercises: [{
            id: 'e1',
            name: 'First exercise',
            workoutId: 'w1',
          }],
        },
      });
      const workoutId: Exercise['workoutId'] = 'w1';

      const selectedExercises = exercisesSelectors.selectExercises(state, workoutId);
      expect(selectedExercises).toEqual([{
        id: 'e1',
        name: 'First exercise',
        workoutId: 'w1',
      }]);
    });
  });

  describe('selectExercisesWithLastModified()', () => {
    it('should add lastModified property to each exercise', () => {
      const todaysDate = moment();
      const lastWeeksDate = todaysDate.clone().subtract(7, 'days');

      const state = getDefaultState({
        exercisesReducer: {
          exercises: [{
            id: 'e1',
            name: 'legs',
            workoutId: 'w1',
          }],
        },
        setsReducer: {
          sets: [{
            id: 's1',
            reps: 8,
            weight: 100,
            difficulty: undefined,
            date: todaysDate,
            exerciseId: 'e1',
          }, {
            id: 's2',
            reps: 8,
            weight: 100,
            difficulty: undefined,
            date: lastWeeksDate,
            exerciseId: 'e1',
          }],
        },
      });

      expect(
        exercisesSelectors.selectExercisesWithLastModified(
          state,
          ({ id: 'w1' } as Workout),
        ),
      ).toEqual([{
        id: 'e1',
        name: 'legs',
        workoutId: 'w1',
        lastModified: todaysDate,
      }]);
    });

    it('should return exercises sorted by name in asc order', () => {
      const workout1 = {
        id: 'w1',
        name: 'a-workout1',
        exerciseSettings: {
          sorting: Sorting.name,
          direction: Direction.ASC,
        },
      };

      const state = getDefaultState({
        workoutsReducer: {
          workouts: [workout1],
          globalWorkoutSettings: {
            sorting: Sorting.lastModified,
            direction: Direction.ASC,
          },
        },
        exercisesReducer: {
          exercises: [{
            id: 'a',
            name: 'a',
            workoutId: 'w1',
          }, {
            id: 'c',
            name: 'c',
            workoutId: 'w1',
          }, {
            id: 'b',
            name: 'b',
            workoutId: 'w1',
          }],
        },
        setsReducer: {
          sets: [],
        },
      });

      const sortedExercises = exercisesSelectors.selectExercisesWithLastModified(state, workout1);
      const exerciseNames = sortedExercises.map((e) => e.name);
      expect(exerciseNames).toEqual(['a', 'b', 'c']);
    });
  });
});

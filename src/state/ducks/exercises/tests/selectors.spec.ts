/* eslint-disable no-undef */
import moment from 'moment';

import { Exercise } from '../types';
import { exercisesSelectors } from '..';
import { getDefaultState } from '../../testHelpers';

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
          'w1',
        ),
      ).toEqual([{
        id: 'e1',
        name: 'legs',
        workoutId: 'w1',
        lastModified: todaysDate,
      }]);
    });
  });
});

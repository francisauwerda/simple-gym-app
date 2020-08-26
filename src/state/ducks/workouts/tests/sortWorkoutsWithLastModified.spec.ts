/* eslint-disable no-undef */
// TODO: Write tests for lastModified asc and dsc

import moment from 'moment';

import { sortWorkoutsWithLastModified } from '../utils';
import { WorkoutWithLastModified, GlobalWorkoutSettings } from '../types';

describe('sortWorkoutsWithLastModified()', () => {
  describe('when sorting by asc order', () => {
    it('should return workouts by lastmodified in asc order', () => {
      const workoutsWithLastModified: WorkoutWithLastModified[] = [{
        id: 'w1',
        name: 'w1',
        lastModified: moment('2020-10-01'),
      }, {
        id: 'w2',
        name: 'w2',
        lastModified: moment('2020-10-03'),
      }, {
        id: 'w3',
        name: 'w3',
        lastModified: moment('2020-10-02'),
      }];
      const globalWorkoutSettings: GlobalWorkoutSettings = {
        direction: 'ASC',
        sorting: 'lastModified',
      };

      const sortedWorkouts = sortWorkoutsWithLastModified(
        workoutsWithLastModified,
        globalWorkoutSettings,
      );

      expect(sortedWorkouts).toEqual([{
        id: 'w1',
        name: 'w1',
        lastModified: moment('2020-10-01'),
      }, {
        id: 'w3',
        name: 'w3',
        lastModified: moment('2020-10-02'),
      }, {
        id: 'w2',
        name: 'w2',
        lastModified: moment('2020-10-03'),
      }]);
    });

    it('should return workouts by lastmodified in desc order', () => {
      const workoutsWithLastModified: WorkoutWithLastModified[] = [{
        id: 'w1',
        name: 'w1',
        lastModified: moment('2020-10-01'),
      }, {
        id: 'w2',
        name: 'w2',
        lastModified: moment('2020-10-03'),
      }, {
        id: 'w3',
        name: 'w3',
        lastModified: moment('2020-10-02'),
      }];
      const globalWorkoutSettings: GlobalWorkoutSettings = {
        direction: 'DESC',
        sorting: 'lastModified',
      };

      const sortedWorkouts = sortWorkoutsWithLastModified(
        workoutsWithLastModified,
        globalWorkoutSettings,
      );

      expect(sortedWorkouts).toEqual([{
        id: 'w2',
        name: 'w2',
        lastModified: moment('2020-10-03'),
      }, {
        id: 'w3',
        name: 'w3',
        lastModified: moment('2020-10-02'),
      }, {
        id: 'w1',
        name: 'w1',
        lastModified: moment('2020-10-01'),
      }]);
    });
  });
});

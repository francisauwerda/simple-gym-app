/* eslint-disable no-undef */
import uuid from 'uuidv4';
import moment, { Moment } from 'moment';
import { mocked } from 'ts-jest/utils';

import { setsSelectors } from '..';
import { AppState } from '../../../types';
import { Workout } from '../../workouts/types';
import { Exercise } from '../../exercises/types';
import { Set, Difficulty } from '../types';
import DateWrapper from '../../../../wrappers/dateWrapper';

interface DefaultData {
  workouts: Workout[],
  exercises: Exercise[],
  sets: Set[]
}

jest.mock('../../../../wrappers/dateWrapper');

describe('setsSelectors', () => {
  describe('selectSetsTodayAndLastSession()', () => {
    let defaultData: DefaultData;
    let today: Moment;
    let yesterday: Moment;
    let yesterdayMinus10Minutes: Moment;
    let squatsId: string;

    beforeAll(() => {
      mocked(DateWrapper.createDate).mockImplementation(
        () => new Date('2020-01-15 09:30:00.000Z'),
      );

      const legsId = uuid();
      const shouldersId = uuid();

      squatsId = uuid();
      const rdlId = uuid();
      const shoulderPressId = uuid();
      today = moment(DateWrapper.createDate());
      yesterday = today.clone().subtract(1, 'day');
      yesterdayMinus10Minutes = yesterday.clone().subtract(10, 'minutes');
      const lastMonth = today.clone().subtract(1, 'M');

      defaultData = {
        workouts: [{
          id: legsId,
          name: 'Legs',
        }, {
          id: shouldersId,
          name: 'Shoulders',
        }],

        exercises: [{
          id: squatsId,
          name: 'Squats',
          workoutId: legsId,
        }, {
          id: rdlId,
          name: 'RDL',
          workoutId: legsId,
        }, {
          id: shoulderPressId,
          name: 'Shoulder Press',
          workoutId: shouldersId,
        }],

        sets: [{
          id: 's1',
          reps: 10,
          date: yesterdayMinus10Minutes,
          difficulty: Difficulty.Easy,
          weight: 100,
          exerciseId: squatsId,
        }, {
          id: 's2',
          reps: 10,
          date: yesterday,
          difficulty: Difficulty.Easy,
          weight: 123,
          exerciseId: squatsId,
        }, {
          id: 's3',
          reps: 8,
          date: lastMonth,
          difficulty: Difficulty.Easy,
          weight: 100,
          exerciseId: squatsId,
        }, {
          id: 's4',
          reps: 8,
          date: today,
          difficulty: Difficulty.Easy,
          weight: 90,
          exerciseId: squatsId,
        }, {
          id: 's5',
          reps: 8,
          date: today,
          difficulty: Difficulty.Easy,
          weight: 90,
          exerciseId: squatsId,
        }],
      };
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it('Today and Last session', () => {
      const state: AppState = {
        exercisesReducer: {
          exercises: [...defaultData.exercises],
        },
        setsReducer: {
          sets: [...defaultData.sets],
        },
        workoutsReducer: {
          workouts: [...defaultData.workouts],
        },
      };

      const sorted = setsSelectors
        .selectSetsTodayAndLastSession(state, defaultData.exercises[0].id);

      expect(sorted).toEqual({
        lastSession: [{
          id: 's1',
          reps: 10,
          date: yesterdayMinus10Minutes,
          difficulty: Difficulty.Easy,
          weight: 100,
          exerciseId: squatsId,
        }, {
          id: 's2',
          reps: 10,
          date: yesterday,
          difficulty: Difficulty.Easy,
          weight: 123,
          exerciseId: squatsId,
        }],
        today: [{
          id: 's4',
          reps: 8,
          date: today,
          difficulty: Difficulty.Easy,
          weight: 90,
          showTimer: false,
          exerciseId: squatsId,
        }, {
          id: 's5',
          reps: 8,
          date: today,
          difficulty: Difficulty.Easy,
          weight: 90,
          showTimer: true,
          exerciseId: squatsId,
        }],
      });
    });
  });

  describe('selectSetsToday()', () => {
    const exerciseId = 'e1';
    let state: AppState;
    let set1: Set;
    let set2: Set;
    let set3: Set;


    beforeAll(() => {
      mocked(DateWrapper.createDate).mockImplementation(
        () => new Date('2020-01-15 09:30:00.000Z'),
      );
      const todayMinus2Minutes = moment(DateWrapper.createDate()).clone().subtract(2, 'minutes');
      const todayMinus4Minutes = todayMinus2Minutes.clone().subtract(2, 'minutes');
      const todayMinus6Minutes = todayMinus4Minutes.clone().subtract(2, 'minutes');

      const workout1: Workout = {
        id: 'w1',
        name: 'workout1',
      };
      const exercise1: Exercise = {
        id: exerciseId,
        name: 'exercise1',
        workoutId: 'w1',
      };
      set1 = {
        id: 's1',
        difficulty: Difficulty.Easy,
        exerciseId,
        date: todayMinus6Minutes,
        reps: 11,
        weight: 101,
      };
      set2 = {
        id: 's2',
        difficulty: Difficulty.Easy,
        exerciseId,
        date: todayMinus4Minutes,
        reps: 12,
        weight: 102,
      };
      set3 = {
        id: 's3',
        difficulty: Difficulty.Easy,
        exerciseId,
        date: todayMinus2Minutes,
        reps: 13,
        weight: 103,
      };

      state = {
        workoutsReducer: {
          workouts: [workout1],
        },
        exercisesReducer: {
          exercises: [exercise1],
        },
        setsReducer: {
          sets: [set1, set2, set3],
        },
      };
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it('should return showTimer=true for set2', () => {
      const todaysSets = setsSelectors.selectSetsToday(state, exerciseId);
      expect(todaysSets).toEqual([
        { ...set1, showTimer: false },
        { ...set2, showTimer: false },
        { ...set3, showTimer: true },
      ]);
    });
  });
});

/* eslint-disable no-undef */
import uuid from 'uuidv4';
import moment from 'moment';
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

describe('My Test Suite', () => {
  let defaultData: DefaultData;
  let today;
  let yesterday;
  let squatsId;

  beforeAll(() => {
    mocked(DateWrapper.createDate).mockImplementation(
      () => new Date('2020-01-15 09:30:00'),
    );

    const legsId = uuid();
    const shouldersId = uuid();

    squatsId = uuid();
    const rdlId = uuid();
    const shoulderPressId = uuid();
    today = moment(DateWrapper.createDate());
    yesterday = today.clone().subtract(1, 'day');
    const lastMonth = today.clone().subtract(1, 'M');
    const lastYear = today.clone().subtract(1, 'year');

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
        date: lastYear,
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
    const sorted = setsSelectors.selectSetsTodayAndLastSession(state, defaultData.exercises[0].id);

    expect(sorted).toEqual({
      lastSession: [{
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
        exerciseId: squatsId,
      }, {
        id: 's5',
        reps: 8,
        date: today,
        difficulty: Difficulty.Easy,
        weight: 90,
        exerciseId: squatsId,
      }],
    });
  });
});

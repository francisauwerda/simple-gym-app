/* eslint-disable no-undef */
import uuid from 'uuidv4';
import moment from 'moment';

import { setsSelectors } from '..';
import { State } from '../../../types';
import { SetsByDays } from '../selectors';
import { Workout } from '../../workouts/types';
import { Exercise } from '../../exercises/types';
import { Set } from '../types';

interface DefaultData {
  workouts: Workout[],
  exercises: Exercise[],
  sets: Set[]
}

describe('My Test Suite', () => {
  let defaultData: DefaultData;

  beforeAll(() => {
    const legsId = uuid();
    const shouldersId = uuid();

    const squatsId = uuid();
    const rdlId = uuid();
    const shoulderPressId = uuid();
    const today = moment();
    const yesterday = today.clone().subtract(1, 'day');
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
        id: uuid(),
        reps: 10,
        date: lastYear,
        difficulty: 4,
        weight: 100,
        exerciseId: squatsId,
      }, {
        id: uuid(),
        reps: 10,
        date: yesterday,
        difficulty: 4,
        weight: 123,
        exerciseId: squatsId,
      }, {
        id: uuid(),
        reps: 8,
        date: lastMonth,
        difficulty: 5,
        weight: 100,
        exerciseId: squatsId,
      }, {
        id: uuid(),
        reps: 8,
        date: today,
        difficulty: 5,
        weight: 90,
        exerciseId: squatsId,
      }, {
        id: uuid(),
        reps: 8,
        date: today,
        difficulty: 5,
        weight: 90,
        exerciseId: squatsId,
      }],
    };
  });

  it.skip('My Test Case', () => {
    const state: State = {
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
    const mySets = setsSelectors.selectSetsGroupedByDate(state, defaultData.exercises[0].id);


    const result: SetsByDays = {
      2018: {
        10: {
          11: [
            defaultData.sets[4],
          ],
        },
      },
      2019: {
        10: {
          10: [
            defaultData.sets[2],
          ],
          11: [
            defaultData.sets[3],
          ],
        },
        9: {
          11: [
            defaultData.sets[0],
            defaultData.sets[1],
          ],
        },
      },
    };

    expect(mySets).toEqual(result);
  });

  it('Today and Last session', () => {
    const state: State = {
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

    expect(sorted).toEqual({});
  });
});

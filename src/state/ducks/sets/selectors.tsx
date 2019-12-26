import moment, { Moment } from 'moment';
import { State } from '../../types';
import { Set } from './types';


const selectSets = (state: State) => state.setsReducer.sets;

const selectExerciseSets = (state: State, exerciseId: Set['exerciseId']): Set[] => {
  const sets = selectSets(state);
  return sets.filter((set) => set.exerciseId === exerciseId);
};

export interface SetsByDays {
  [year: string]: {
    [month: string]: {
      [day: string]: Set[]
    }
  }
}

const groupSetsByDate = (sets: Set[]): SetsByDays => sets.reduce((previousVal, currentVal) => {
  const date = moment(currentVal.date).date();
  const month = moment(currentVal.date).month();
  const year = moment(currentVal.date).year();

  const accumulator = {
    ...previousVal,
  };

  if (!accumulator[year]) {
    accumulator[year] = {
      [month]: {
        [date]: [currentVal],
      },
    };
  } else if (!accumulator[year][month]) {
    accumulator[year] = {
      ...accumulator[year],
      [month]: {
        [date]: [currentVal],
      },
    };
  } else if (!accumulator[year][month][date]) {
    accumulator[year][month] = {
      ...accumulator[year][month],
      [date]: [currentVal],
    };
  } else {
    accumulator[year][month][date].push(currentVal);
  }

  return accumulator;
}, {});

const selectSetsGroupedByDate = (state: State, exerciseId: Set['exerciseId']): SetsByDays => {
  const sets = selectExerciseSets(state, exerciseId);
  const groupedByDays: SetsByDays = groupSetsByDate(sets);
  return groupedByDays;
};

interface SetsTodayAndLastSession {
  today: Set[];
  lastSession: Set[];
}

const selectSetsTodayAndLastSession = (
  state: State,
  exerciseId: Set['exerciseId'],
): SetsTodayAndLastSession => {
  const sets = [...selectExerciseSets(state, exerciseId)];

  // Sort by latest dates first. Descending.
  const todaysSets = sets
    .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
    .filter((set) => moment().isSame(moment(set.date), 'date'));


  let lastSessionDate: Moment;
  const lastSessionSets = sets
    .filter((set) => (!todaysSets.includes(set)))
    .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
    .filter((set) => {
      if (!lastSessionDate) {
        lastSessionDate = moment(set.date);
      }
      const simplifiedDate = moment(set.date);
      const isFromLastSession = lastSessionDate.isSame(simplifiedDate, 'date');

      return isFromLastSession;
    });

  return {
    today: [...todaysSets],
    lastSession: [...lastSessionSets],
  };
};

export default {
  selectExerciseSets,
  selectSetsGroupedByDate,
  selectSetsTodayAndLastSession,
};

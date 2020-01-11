import moment, { Moment } from 'moment';
import { AppState } from '../../types';
import { Set } from './types';


const selectSets = (state: AppState) => state.setsReducer.sets;

const selectExerciseSets = (state: AppState, exerciseId: Set['exerciseId']): Set[] => {
  const sets = selectSets(state);
  return sets.filter((set) => set.exerciseId === exerciseId);
};

const selectExerciseLastModified = (state: AppState, exerciseId: Set['exerciseId']): Set['date'] => {
  const exerciseSetsDates = selectExerciseSets(state, exerciseId)
    .map((set) => set.date)
    .sort((a, b) => moment(b).valueOf() - moment(a).valueOf());

  return exerciseSetsDates[0];
};

export interface SetsByDays {
  [year: string]: {
    [month: string]: {
      [day: string]: Set[]
    }
  }
}

interface SetsTodayAndLastSession {
  today: Set[];
  lastSession: Set[];
}

const selectSetsTodayAndLastSession = (
  state: AppState,
  exerciseId: Set['exerciseId'],
): SetsTodayAndLastSession => {
  const sets = [...selectExerciseSets(state, exerciseId)];

  const todaysSets = sets
    .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
    .filter((set) => moment().isSame(moment(set.date), 'date'));


  let lastSessionDate: Moment;
  const lastSessionSets = sets
    .filter((set) => (!todaysSets.includes(set)))
    .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
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
  selectSetsTodayAndLastSession,
  selectExerciseLastModified,
};

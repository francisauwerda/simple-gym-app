import moment, { Moment } from 'moment';
import { AppState } from '../../types';
import { Set, SetWithExtras } from './types';
import DateWrapper from '../../../wrappers/dateWrapper';

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
  today: SetWithExtras[];
  lastSession: Set[];
}

const selectSetsToday = (state: AppState, exerciseId: Set['exerciseId']): SetsTodayAndLastSession['today'] => {
  const TIMER_LENGTH_IN_MINUTES = 5;
  const sets = [...selectExerciseSets(state, exerciseId)];

  const todaysSets: SetsTodayAndLastSession['today'] = sets
    .filter((set) => moment(DateWrapper.createDate()).isSame(moment(set.date), 'date'))
    .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()) // ASC (oldest first)
    .map((set, index, array) => {
      let showTimer = false;
      if (index === array.length - 1) {
        const now = moment(DateWrapper.createDate());
        const differenceInMinutes = moment(now).diff(set.date, 'minutes');
        if (differenceInMinutes >= 0 && differenceInMinutes <= TIMER_LENGTH_IN_MINUTES) {
          showTimer = true;
        }
      }
      return { ...set, showTimer };
    });

  return todaysSets;
};

const selectSetsTodayAndLastSession = (
  state: AppState,
  exerciseId: Set['exerciseId'],
): SetsTodayAndLastSession => {
  const sets = [...selectExerciseSets(state, exerciseId)];

  const todaysSets = selectSetsToday(state, exerciseId);
  const todaysSetsIds = todaysSets.map((set) => set.id);

  let lastSessionDate: Moment;
  const lastSessionSets = sets
    .filter((set) => !todaysSetsIds.includes(set.id))
    .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()) // DESC (newest first)
    .filter((set) => {
      if (!lastSessionDate) {
        lastSessionDate = moment(set.date);
      }
      const simplifiedDate = moment(set.date);
      const isFromLastSession = lastSessionDate.isSame(simplifiedDate, 'date');

      return isFromLastSession;
    })
    .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()); // ASC (oldest first)

  return {
    today: [...todaysSets],
    lastSession: [...lastSessionSets],
  };
};

export default {
  selectSetsToday,
  selectExerciseSets,
  selectSetsTodayAndLastSession,
  selectExerciseLastModified,
};

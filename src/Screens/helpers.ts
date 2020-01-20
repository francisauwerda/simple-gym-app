import moment from 'moment';

import { FORM_MODES } from './enums';
import { WorkoutWithLastModified } from '../state/ducks/workouts/types';
import DateWrapper from '../wrappers/dateWrapper';

interface ModalProps {
  onSubmitHandler: (fields: any) => void;
  formMode: FORM_MODES;
}

interface Handlers {
  id?: any;
  addHandler: (fields: any) => void;
  editHandler: (id: any, fields: any) => void;
}

export const getModalProps = ({
  id,
  addHandler,
  editHandler,
}: Handlers): ModalProps => {
  let onSubmitHandler: ModalProps['onSubmitHandler'];
  let formMode: ModalProps['formMode'];

  if (id) {
    onSubmitHandler = (fields: any) => editHandler(id, fields);
    formMode = FORM_MODES.EDIT;
  } else {
    onSubmitHandler = (fields: any) => addHandler(fields);
    formMode = FORM_MODES.ADD;
  }

  return {
    onSubmitHandler,
    formMode,
  };
};

export const getLastModifiedText = (lastModified: WorkoutWithLastModified['lastModified']): string => {
  if (lastModified) {
    // First check if start of day is same as todays start of day
    const nowStartOfDay = moment(DateWrapper.createDate()).clone().startOf('day');
    const lastModifiedStartOfDay = moment(lastModified).clone().startOf('day');
    const daysAgo = moment(nowStartOfDay).diff(lastModifiedStartOfDay, 'days');

    if (!daysAgo) {
      return 'Today';
    }
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  }

  return '';
};

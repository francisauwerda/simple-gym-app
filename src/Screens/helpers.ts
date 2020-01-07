import moment from 'moment';

import { FORM_MODES } from './enums';
import { WorkoutWithLastModified } from '../state/ducks/workouts/types';

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
    const daysAgo = moment().diff(lastModified, 'days');
    if (daysAgo) {
      return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
    }

    return 'Today';
  }

  return '';
};

import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import SetForm from './SetForm';
import { Exercise } from '../../state/ducks/exercises/types';
import { SetDetails } from '../../state/ducks/sets/types';
import ModalWrapper from '../../components/ModalWrapper';
import { FORM_MODES } from '../enums';

export interface NavigationParams {
  onSubmitHandler: (fields: SetDetails) => void;
  exercise: Exercise;
  initialValues?: SetDetails;
  formMode: FORM_MODES;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

const SetModal = (props: Props) => {
  const { navigation } = props;

  const {
    onSubmitHandler, initialValues, exercise, formMode,
  } = navigation.state.params;


  return (
    <ModalWrapper>
      <SetForm
        formMode={formMode}
        onSubmitHandler={onSubmitHandler}
        dismissModal={() => navigation.goBack()}
        exercise={exercise}
        initialValues={initialValues}
      />
    </ModalWrapper>
  );
};

export default SetModal;

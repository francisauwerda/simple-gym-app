import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import ExerciseForm from './ExerciseForm';
import { Workout } from '../../state/ducks/workouts/types';
import { ExerciseDetails } from '../../state/ducks/exercises/types';
import ModalWrapper from '../../components/ModalWrapper';
import { FORM_MODES } from '../enums';

export interface NavigationParams {
  onSubmitHandler: (fields: ExerciseDetails) => void;
  initialValues?: ExerciseDetails;
  formMode: FORM_MODES;
  workout: Workout;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

const ExerciseModal = (props: Props) => {
  const { navigation } = props;

  const {
    workout, onSubmitHandler, initialValues, formMode,
  } = navigation.state.params;

  return (
    <ModalWrapper>
      <ExerciseForm
        onSubmitHandler={onSubmitHandler}
        initialValues={initialValues}
        formMode={formMode}
        dismissModal={() => navigation.goBack()}
        workout={workout}
      />
    </ModalWrapper>
  );
};

export default ExerciseModal;

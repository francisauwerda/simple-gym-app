import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import ModalWrapper from '../../components/ModalWrapper';
import WorkoutForm from './WorkoutForm';
import { FORM_MODES } from './WorkoutsScreen';
import { WorkoutDetails } from '../../state/ducks/workouts/types';

export interface NavigationParams {
  onSubmitHandler: any;
  initialValues?: WorkoutDetails;
  formMode: FORM_MODES;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;


interface Props {
  navigation: Navigation;
}

const WorkoutModal = (props: Props) => {
  const { navigation } = props;
  const { onSubmitHandler, initialValues, formMode } = navigation.state.params;

  return (
    <ModalWrapper>
      <WorkoutForm
        onSubmitHandler={onSubmitHandler}
        formMode={formMode}
        initialValues={initialValues}
        dismissModal={() => navigation.goBack()}
      />
    </ModalWrapper>
  );
};

export default WorkoutModal;

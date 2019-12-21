import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import AddSetForm from './AddSetForm';
import { Exercise } from '../../state/ducks/exercises/types';
import { SetDetails, SetInputs } from '../../state/ducks/sets/types';
import ModalWrapper from '../../components/ModalWrapper';

export enum AddSetParams {
  AddSetParam = 'ADD_EXERCISE',
  ExerciseParam = 'WORKOUT',
  InitialValues = 'INITIAL_VALUES'
}

interface NavigationParams {
  [AddSetParams.AddSetParam]: (setDetails: SetDetails) => void;
  [AddSetParams.ExerciseParam]: Exercise;
  [AddSetParams.InitialValues]?: SetInputs;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

const AddSetModal = (props: Props) => {
  const { navigation } = props;

  const addSet = navigation.state.params[AddSetParams.AddSetParam];
  const exercise = navigation.state.params[AddSetParams.ExerciseParam];
  const initialValues = navigation.state.params[AddSetParams.InitialValues];

  const dismissModal = () => {
    navigation.goBack();
  };

  return (
    <ModalWrapper>
      <AddSetForm
        addSet={addSet}
        dismissModal={dismissModal}
        exercise={exercise}
        initialValues={initialValues}
      />
    </ModalWrapper>
  );
};

export default AddSetModal;

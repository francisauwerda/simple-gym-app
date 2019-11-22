import React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import AddSetForm from './AddSetForm';
import { Exercise } from '../../state/ducks/exercises/types';
import { SetDetails } from '../../state/ducks/sets/types';
import ModalWrapper from '../../components/ModalWrapper';

export enum AddSetParams {
  AddSetParam = 'ADD_EXERCISE',
  ExerciseParam = 'WORKOUT'
}

interface NavigationParams {
  [AddSetParams.AddSetParam]: (setDetails: SetDetails) => void;
  [AddSetParams.ExerciseParam]: Exercise;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

const AddSetModal = (props: Props) => {
  const { navigation } = props;

  const addSet = navigation.state.params[AddSetParams.AddSetParam];
  const exercise = navigation.state.params[AddSetParams.ExerciseParam];

  const dismissModal = () => {
    navigation.goBack();
  };

  return (
    <ModalWrapper>
      <AddSetForm
        addSet={addSet}
        dismissModal={dismissModal}
        exercise={exercise}
      />
    </ModalWrapper>
  );
};

export default AddSetModal;

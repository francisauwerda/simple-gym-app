import React from 'react';
import {
  SafeAreaView, StyleSheet, View, KeyboardAvoidingView, StatusBar,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AddWorkoutForm from './AddWorkoutForm';
import ModalHeader from '../../components/ModalHeader';
import { WorkoutDetails } from '../../state/ducks/workouts/types';

export enum AddWorkoutParams {
  AddWorkout = 'ADD_WORKOUT'
}

interface AddWorkoutModalNavigationState extends NavigationState {
  params: {
    [AddWorkoutParams.AddWorkout]: (workoutDetails: WorkoutDetails) => void;
  }
}

interface Props {
  navigation: NavigationScreenProp<AddWorkoutModalNavigationState, NavigationParams>,
}

const AddWorkoutModal = (props: Props) => {
  const { navigation } = props;

  const addWorkout = navigation.getParam(AddWorkoutParams.AddWorkout);

  const dismissModal = () => {
    navigation.goBack();
  };

  return (

    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <SafeAreaView style={styles.safeAreaView}>
        <ModalHeader dismissModal={dismissModal} />
        <View style={styles.formWrapper}>
          <AddWorkoutForm
            addWorkout={addWorkout}
            dismissModal={dismissModal}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>

  );
};

export default AddWorkoutModal;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    // This is only for android but for some reason doesn't affect iOS
    paddingTop: StatusBar.currentHeight,
  },
  formWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

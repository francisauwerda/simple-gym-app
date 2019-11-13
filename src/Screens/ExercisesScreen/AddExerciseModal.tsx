import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
}

const AddExerciseModal = (props: Props) => (
  <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 30 }}>This is an exercise</Text>
    <Button
      onPress={() => props.navigation.goBack()}
      title="Dismiss"
    />
  </SafeAreaView>
);

export default AddExerciseModal;

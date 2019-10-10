import React from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

import { ScreenNames } from '../enums';
import { Workout } from '../../state/ducks/workouts/types';

const texts = {
  title: 'Workouts Screen',
  button: 'Go to exercises',
};

interface WorkoutsScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
  workouts: Workout[],
}

const WorkoutsScreenView = (props: WorkoutsScreenProps) => {
  const {
    workouts,
  } = props;
  return (
    <View style={styles.container}>
      <Text>{texts.title}</Text>
      <Text>List of workouts</Text>
      {workouts.map((workout) => (
        <Button
          key={`${workout.id}.${workout.name}`}
          title={`Go to ${workout.name}`}
          onPress={() => props.navigation.navigate(ScreenNames.Exercises)}
        />
      ))}
    </View>
  );
};

export default WorkoutsScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

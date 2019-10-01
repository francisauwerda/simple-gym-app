import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import {
  NavigationScreenProp, NavigationParams, NavigationState,
} from 'react-navigation';
import { ScreenNames } from '../enums';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function ExercisesScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Exercises Screen</Text>
      <Button
        title="Go to sets"
        onPress={() => props.navigation.navigate(ScreenNames.Sets)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

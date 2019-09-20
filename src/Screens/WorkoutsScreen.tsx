import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { ScreenNames } from './enums';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export default function WorkoutsScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Text>Workouts Screen</Text>
      <Button
        title="Go to session"
        onPress={() => props.navigation.navigate(ScreenNames.Session)}
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

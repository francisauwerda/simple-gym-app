import React from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';

import { Set } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';

interface Props {
  sets: Set[];
  exercise: Exercise;
}

export default function SetsScreenView(props: Props) {
  const { sets, exercise } = props;

  return (
    <View style={styles.container}>
      <Text>{`List of Sets for ${exercise.name} ${exercise.id.substr(0, 2)}`}</Text>

      {sets.map((set, i) => (
        <View key={`${set.id}`} style={styles.set}>
          <Text>{`Set ${i + 1}`}</Text>
          <View>
            <Text>Weight:</Text>
            <Text>{set.weight}</Text>
          </View>
          <View>
            <Text>Reps:</Text>
            <Text>{set.reps}</Text>
          </View>
          <View>
            <Text>Date:</Text>
            <Text>{set.date}</Text>
          </View>
          <View>
            <Text>Difficulty:</Text>
            <Text>{set.difficulty}</Text>
          </View>
        </View>
      ))}
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
  set: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',

  },
});

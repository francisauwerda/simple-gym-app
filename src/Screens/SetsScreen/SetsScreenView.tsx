import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, FlatList, View, Button,
} from 'react-native';

import { Set, SetDetails } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';

interface Props {
  sets: Set[];
  exercise: Exercise;
  addSet: (setDetails: SetDetails) => void;
}

const SetInfo = ({ set }: { set: Set }) => (
  <View style={styles.set}>
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
);

export default function SetsScreenView(props: Props) {
  const { sets, exercise, addSet } = props;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`List of Sets for ${exercise.name} ${exercise.id.substr(0, 2)}`}</Text>
      <Button
        title="Add a dummy set"
        onPress={() => addSet({
          difficulty: 5, weight: 99, exerciseId: exercise.id, reps: 5, date: '03-11-2019',
        })}
      />

      <FlatList
        data={sets}
        renderItem={({ item }) => (
          <SetInfo
            set={item}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  set: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});

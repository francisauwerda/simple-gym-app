import React from 'react';
import moment from 'moment';
import {
  SafeAreaView, StyleSheet, Text, FlatList, View,
} from 'react-native';

import { Set, SetDetails } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
import AddSetForm from './AddSetForm';

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
      <Text>{moment(set.date).format()}</Text>
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
      <AddSetForm addSet={addSet} exercise={exercise} />

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
  set: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});

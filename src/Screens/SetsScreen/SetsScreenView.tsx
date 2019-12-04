import React from 'react';
import moment from 'moment';
import {
  SafeAreaView, StyleSheet, Text, SectionList, Button,
} from 'react-native';

import { Set, SetDetails } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
import Card from '../../components/Card';

interface Props {
  todaysSets: Set[],
  lastSessionSets: Set[],
  exercise: Exercise;
  addSet: (setDetails: SetDetails) => void;
  openModal: () => void;
}

export default function SetsScreenView(props: Props) {
  const { todaysSets, lastSessionSets, openModal } = props;
  const myData = [{
    title: 'Today',
    data: todaysSets,
  }, {
    title: 'Last session',
    data: lastSessionSets,
  }];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.sectionListContainer}
        sections={myData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index, section }) => (
          <Card
            leftAccessory={section.data.length - index}
            mainText={`${item.weight} kg`}
            secondaryText={`${item.reps} reps. ${moment(item.date).format('LLLL')}`}
            onClickHandler={() => {}}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />

      <Button
        title="Add a set"
        onPress={openModal}
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
  sectionListContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    marginHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 28,
    fontWeight: '500',
    backgroundColor: 'white',
    paddingVertical: 16,
  },
});

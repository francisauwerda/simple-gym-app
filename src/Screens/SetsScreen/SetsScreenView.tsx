import React from 'react';
import moment from 'moment';
import {
  SafeAreaView, StyleSheet, Text, SectionList, View,
} from 'react-native';

import { Set, SetDetails } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';

interface Props {
  todaysSets: Set[],
  lastSessionSets: Set[],
  exercise: Exercise;
  addSet: (setDetails: SetDetails) => void;
  deleteSet: (id: Set['id']) => void;
  openModal: () => void;
}

export default function SetsScreenView(props: Props) {
  const {
    todaysSets,
    lastSessionSets,
    openModal,
    deleteSet,
  } = props;

  const myData = [];
  if (todaysSets.length) {
    myData.push({
      title: 'Today',
      data: todaysSets,
    });
  }

  if (lastSessionSets.length) {
    myData.push({
      title: 'Last session',
      subtitle: `${moment(lastSessionSets[0].date).calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd',
        sameElse: 'DD/MM/YYYY',
      })}`,
      data: lastSessionSets,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.sectionListContainer}
        sections={myData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index, section }) => (
          <Card
            // disabled
            leftAccessory={section.data.length - index}
            mainText={`${item.weight} kg`}
            secondaryText={`Reps: ${item.reps}`}
            onClickHandler={() => {
              console.log('Short press: ', item.id);
            }}
            onLongPress={() => {
              // TODO: Add Are you sure dialog.
              console.log('Deleting set: ', item.id);
              deleteSet(item.id);
            }}
          />
        )}
        renderSectionHeader={({ section: { title, subtitle } }) => (
          <View style={styles.sectionTitles}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {!!subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
          </View>
        )}
      />

      <BottomWrapper>
        <Button
          title="Add a set"
          onPress={openModal}
        />
      </BottomWrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sectionListContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 8,
    marginHorizontal: 16,
  },
  sectionTitles: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '500',
  },
  sectionSubtitle: {
    fontSize: 16,
  },
});

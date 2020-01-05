import React from 'react';
import {
  SafeAreaView, StyleSheet, Text, SectionList, View,
} from 'react-native';

import { Set } from '../../state/ducks/sets/types';
import { Exercise } from '../../state/ducks/exercises/types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import BottomWrapper from '../../components/BottomWrapper';
import { DispatchProps, OpenModalProps } from './SetsScreen';
import { getLastModifiedText } from '../helpers';

type Props = {
  todaysSets: Set[],
  lastSessionSets: Set[],
  exercise: Exercise;
  openModal: (props: OpenModalProps) => void;
} & Partial<DispatchProps>

export default function SetsScreenView(props: Props) {
  const {
    todaysSets,
    lastSessionSets,
    openModal,
    deleteSet,
  } = props;

  // TODO: Move this out of the render function
  const myData: { title: string, subtitle?: string, data: Set[] }[] = [];
  if (todaysSets.length) {
    myData.push({
      title: 'Today',
      data: todaysSets,
    });
  }

  if (lastSessionSets.length) {
    myData.push({
      title: 'Last session',
      subtitle: getLastModifiedText(lastSessionSets[0].date),
      data: lastSessionSets,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.sectionListContainer}
        sections={myData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index, section }: {
          item: Set, index: number, section: any
        }) => (
          <Card
            // disabled
            leftAccessory={section.data.length - index}
            mainText={`${item.weight} kg`}
            secondaryText={`Reps: ${item.reps}`}
            onClickHandler={() => {
              openModal({
                initialValues: {
                  date: item.date,
                  difficulty: item.difficulty,
                  weight: item.weight,
                  reps: item.reps,
                  exerciseId: item.exerciseId,
                },
              });
            }}
            optionsActionSheetProps={{
              onEditHandler: () => {
                openModal({
                  id: item.id,
                  initialValues: {
                    date: item.date,
                    difficulty: item.difficulty,
                    weight: item.weight,
                    reps: item.reps,
                    exerciseId: item.exerciseId,
                  },
                });
              },
              onDeleteHandler: () => {
                deleteSet(item.id);
              },
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
          onPress={() => openModal({})}
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

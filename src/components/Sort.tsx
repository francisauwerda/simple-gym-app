import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Direction, Settings, Sorting } from '../state/types';
import TouchableComponent from './TouchableComponent';

const Sort = ({
  setSettings,
  settings = {
    sorting: Sorting.name,
    direction: Direction.ASC,
  },
}: {
  setSettings: Function,
  settings?: Settings
}) => {
  const { direction, sorting } = settings;

  return (
    <View style={styles.outerContainer}>
      <TouchableComponent
        onPress={() => {
          setSettings({
            ...settings,
            direction: direction === Direction.ASC ? Direction.DESC : Direction.ASC,
          });
        }}
        onLongPress={() => {
          setSettings({
            ...settings,
            sorting: sorting === Sorting.name ? Sorting.lastModified : Sorting.name,
          });
        }}
      >
        <View style={styles.sortContainer}>
          <Text style={styles.sortText}>
            {direction === Direction.ASC ? '☝️' : '👇'}
          </Text>
          <Text style={styles.sortText}>
            {sorting === Sorting.name ? 'Name' : 'Recent'}
          </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  outerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  sortContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  sortText: {
    fontSize: 16,
  },
});

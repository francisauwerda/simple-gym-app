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
          {sorting === Sorting.name ? 'Sort by name' : 'Sort by date'}
        </Text>
        <Text style={styles.sortText}>
          {direction === Direction.ASC ? '☝️' : '👇'}
        </Text>
      </View>
    </TouchableComponent>
  );
};

export default Sort;

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 26,
  },
});

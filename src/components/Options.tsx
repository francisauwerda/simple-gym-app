import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TouchableComponent from './TouchableComponent';

const optionsIcon = require('../assets/round_more_vert_black_48.png');

const Options = ({ onPress }: { onPress: any }) => (
  <View style={styles.optionsWrapper}>
    <TouchableComponent onPress={onPress}>
      <View style={styles.optionsIconWrapper}>
        <Image source={optionsIcon} style={styles.optionsIconStyles} />
      </View>
    </TouchableComponent>
  </View>
);

export default Options;

const OPTIONS_SLOP_DIMENSIONS = 52;
const OPTIONS_BORDER_RADIUS = OPTIONS_SLOP_DIMENSIONS / 2;
const OPTIONS_IMAGE_DIMENSIONS = 32;

const styles = StyleSheet.create({
  optionsIconWrapper: {
    borderRadius: OPTIONS_BORDER_RADIUS,
    width: OPTIONS_SLOP_DIMENSIONS,
    height: OPTIONS_SLOP_DIMENSIONS,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsIconStyles: {
    width: OPTIONS_IMAGE_DIMENSIONS,
    height: OPTIONS_IMAGE_DIMENSIONS,
  },
  optionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

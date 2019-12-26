import React from 'react';
import {
  Text, StyleSheet, View, Image,
} from 'react-native';

import TouchableComponent from '../components/TouchableComponent';

const optionsIcon = require('../assets/round_more_vert_black_48.png');

const Card = ({
  mainText,
  secondaryText,
  onClickHandler,
  leftAccessory,
  disabled,
  onLongPress,
}: {
  mainText: string,
  secondaryText?: string,
  onClickHandler: any,
  leftAccessory?: any,
  disabled?: boolean,
  onLongPress?: any,
}) => (
  <TouchableComponent onPress={onClickHandler} disabled={disabled} onLongPress={onLongPress}>
    <View style={styles.cardWrapper}>
      <View style={styles.leftSideWrapper}>
        {!!leftAccessory && (
        <Text style={styles.leftAccessory}>
          {`Set ${leftAccessory}`}
        </Text>
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.mainText}>{mainText}</Text>
          {!!secondaryText && <Text>{secondaryText}</Text>}
        </View>
      </View>
      <View style={styles.optionsWrapper}>
        <TouchableComponent onPress={() => { console.log('hi'); }}>
          <View style={styles.optionsIconWrapper}>
            <Image source={optionsIcon} style={styles.optionsIconStyles} />
          </View>
        </TouchableComponent>
      </View>
    </View>
  </TouchableComponent>
);

export default Card;

const OPTIONS_SLOP_DIMENSIONS = 52;
const OPTIONS_BORDER_RADIUS = OPTIONS_SLOP_DIMENSIONS / 2;
const OPTIONS_IMAGE_DIMENSIONS = 32;

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
  leftSideWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  mainText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
  textWrapper: {
  },
  leftAccessory: {
    fontSize: 24,
    lineHeight: 30,
    textAlignVertical: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    paddingRight: 10,
    marginRight: 10,
  },
  optionsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

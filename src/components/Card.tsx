import React from 'react';
import {
  Text, StyleSheet, View,
} from 'react-native';

import TouchableComponent from '../components/TouchableComponent';

const Card = ({
  mainText,
  secondaryText,
  onClickHandler,
  leftAccessory,
}: {
  mainText: string,
  secondaryText?: string,
  onClickHandler: any,
  leftAccessory?: any,
}) => (
  <TouchableComponent onPress={onClickHandler}>
    <View style={styles.cardWrapper}>
      {!!leftAccessory && (
      <Text style={styles.leftAccessory}>
        {leftAccessory}
      </Text>
      )}
      <View style={styles.textWrapper}>
        <Text style={styles.mainText}>{mainText}</Text>
        {!!secondaryText && <Text>{secondaryText}</Text>}
      </View>
    </View>
  </TouchableComponent>
);

export default Card;

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
    paddingRight: 10,
    paddingLeft: 5,
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 30,
    textAlignVertical: 'center',
  },
});

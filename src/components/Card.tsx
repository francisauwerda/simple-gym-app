import React from 'react';
import {
  Text, StyleSheet, View,
} from 'react-native';

import TouchableComponent from '../components/TouchableComponent';

const Card = ({
  mainText,
  secondaryText,
  onClickHandler,
}: {
  mainText: string,
  secondaryText?: string,
  onClickHandler: any,
}) => (
  <TouchableComponent onPress={onClickHandler}>
    <View style={styles.cardWrapper}>
      <Text style={styles.mainText}>{mainText}</Text>
      {!!secondaryText && <Text>{secondaryText}</Text>}
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
  },
  mainText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
});
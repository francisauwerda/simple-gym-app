import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity, View,
} from 'react-native';

const Card = ({
  mainText,
  secondaryText,
  onClickHandler,
}: {
  mainText: string,
  secondaryText?: string,
  onClickHandler: any,
}) => (
  <TouchableOpacity onPress={onClickHandler}>
    <View style={styles.cardWrapper}>
      <Text style={styles.mainText}>{mainText}</Text>
      {!!secondaryText && <Text>{secondaryText}</Text>}
    </View>
  </TouchableOpacity>
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
    textTransform: 'capitalize',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 16,
  },
});

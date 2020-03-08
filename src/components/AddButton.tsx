import React from 'react';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import TouchableComponent from './TouchableComponent';

const plusButton = require('../assets/icons8-plus-math-90.png');

interface AddButtonProps {
  text: string
  onPressHandler: Function
}

const AddButton = (props: AddButtonProps) => {
  const { text, onPressHandler } = props;
  return (
    <TouchableComponent onPress={onPressHandler}>
      <View style={styles.buttonWrapper}>
        <Image
          source={plusButton}
          style={styles.plusButton}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableComponent>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  plusButton: {
    width: 18,
    height: 18,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10,
  },
});

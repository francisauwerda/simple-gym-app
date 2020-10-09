import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  children: any;
}

const BottomWrapper = ({ children }: Props) => (
  <View style={styles.bottomWrapper}>
    {children}
  </View>
);

export default BottomWrapper;

const styles = StyleSheet.create({
  bottomWrapper: {
    paddingVertical: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

import React, { ReactChild } from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

interface ScrenLayoutProps {
  children: ReactChild;
}

const ScreenLayout = (props: ScrenLayoutProps) => {
  const { children } = props;

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

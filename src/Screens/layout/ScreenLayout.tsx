import React, { ReactChild } from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';

interface ScrenLayoutProps {
  children: ReactChild;
}

const ScreenLayout = (props: ScrenLayoutProps) => {
  const { children } = props;

  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

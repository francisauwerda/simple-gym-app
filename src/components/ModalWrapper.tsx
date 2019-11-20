import React, { ReactChild } from 'react';
import {
  SafeAreaView, StyleSheet, View, KeyboardAvoidingView, StatusBar,
} from 'react-native';

interface Props {
  children: ReactChild;
}

const ModalWrapper = (props: Props) => {
  const { children } = props;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.formWrapper}>
          {children}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>

  );
};


export default ModalWrapper;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    // This is only for android but for some reason doesn't affect iOS
    paddingTop: StatusBar.currentHeight,
  },
  formWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

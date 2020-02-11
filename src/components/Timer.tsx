import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import DateWrapper from '../wrappers/dateWrapper';


export interface TimerSettings {
  showTimer: boolean,
  date: Moment
}

const Timer = (props: TimerSettings) => {
  const { date } = props;
  let myInterval;

  const [remainingTime, setRemainingtime] = useState(moment(DateWrapper.createDate()).diff(date, 'seconds'));

  useEffect(() => {
    myInterval = setInterval(() => {
      setRemainingtime(moment(DateWrapper.createDate()).diff(date, 'seconds'));
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const remainingSeconds = remainingTime - minutes * 60;

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timer}>{`${minutes}:${(`0${remainingSeconds}`).slice(-2)}`}</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timer: {
    fontSize: 24,
    fontWeight: '500',
  },
  timerContainer: {
    padding: 10,
  },
});

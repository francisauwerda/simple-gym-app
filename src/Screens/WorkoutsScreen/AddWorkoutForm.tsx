import React from 'react';
import {
  TextInput, Button, StyleSheet, View,
} from 'react-native';
import { Formik } from 'formik';
import { WorkoutDetails } from '../../state/ducks/workouts/types';

interface AddWorkoutFormProps {
  addWorkout: (workoutDetails: WorkoutDetails) => void;
  dismissModal: () => void;
}

const initialValues: WorkoutDetails = {
  name: '',
};

const AddWorkoutForm = (props: AddWorkoutFormProps) => {
  const { addWorkout, dismissModal } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        addWorkout(values);
        resetForm();
        dismissModal();
      }}
    >
      {({
        handleChange, handleBlur, values, submitForm,
      }) => (
        <>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Enter workout name"
            autoFocus
          />
          <View style={styles.buttonWrapper}>
            <Button
              title="Add workout"
              onPress={submitForm}
            />
          </View>

        </>
      )}
    </Formik>
  );
};

export default AddWorkoutForm;

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontSize: 24,
  },
  buttonWrapper: {
    marginTop: 20,
    alignSelf: 'stretch',
    marginHorizontal: 15,
  },
});

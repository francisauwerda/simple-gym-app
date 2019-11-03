import React from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { WorkoutDetails } from '../../state/ducks/workouts/types';

interface AddWorkoutFormProps {
  addWorkout: (workoutDetails: WorkoutDetails) => void;
}

const initialValues: WorkoutDetails = {
  name: '',
};

const FormikForm = (props: AddWorkoutFormProps) => {
  const { addWorkout } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        addWorkout(values);
        resetForm();
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
          />
          <Button
            title="Add workout"
            onPress={submitForm}
          />
        </>
      )}
    </Formik>
  );
};

export default FormikForm;

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
});

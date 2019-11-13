import React from 'react';
import { Formik } from 'formik';
import { TextInput, Button, StyleSheet } from 'react-native';
import { ExerciseDetails } from '../../state/ducks/exercises/types';

interface AddExerciseFormProps {
  addExercise: (exerciseDetails: ExerciseDetails) => void;
  workoutId: ExerciseDetails['workoutId'];
  dismissModal: () => void;
}

const initialValues: ExerciseDetails = {
  name: '',
  workoutId: null,
};

const AddExerciseForm = (props: AddExerciseFormProps) => {
  const { addExercise, workoutId, dismissModal } = props;

  return (
    <Formik
      initialValues={{ ...initialValues, workoutId }}
      onSubmit={(values, { resetForm }) => {
        addExercise(values);
        resetForm();
        dismissModal();
      }}
    >
      {({
        submitForm, handleChange, handleBlur, values,
      }) => (
        <>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Enter an exercise name"
            autoFocus
          />
          <Button
            title="Add exercise"
            onPress={submitForm}
          />
        </>
      )}
    </Formik>
  );
};

export default AddExerciseForm;

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
});

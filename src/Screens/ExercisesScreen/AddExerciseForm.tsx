import React from 'react';
import { Formik } from 'formik';
import {
  TextInput, Button, StyleSheet, View,
} from 'react-native';
import { ExerciseDetails } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';

interface AddExerciseFormProps {
  addExercise: (exerciseDetails: ExerciseDetails) => void;
  workout: Workout;
  dismissModal: () => void;
}

const initialValues: ExerciseDetails = {
  name: '',
  workoutId: null,
};

const AddExerciseForm = (props: AddExerciseFormProps) => {
  const { addExercise, workout, dismissModal } = props;

  return (
    <Formik
      initialValues={{ ...initialValues, workoutId: workout.id }}
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
            placeholder={`Enter an exercise for ${workout.name}`}
            autoFocus
          />
          <View style={styles.buttonWrapper}>
            <Button
              title="Add exercise"
              onPress={submitForm}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddExerciseForm;

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

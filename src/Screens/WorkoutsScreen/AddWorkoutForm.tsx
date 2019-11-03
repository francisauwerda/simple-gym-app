import React, { useState } from 'react';
import { TextInput, Button, StyleSheet } from 'react-native';
import { WorkoutDetails } from '../../state/ducks/workouts/types';

interface SubmitFormProps {
  submitFormHandler: (workoutDetails: WorkoutDetails) => void;
  formValues: WorkoutDetails;
  resetForm: () => void;
}

const submitForm = (props: SubmitFormProps): void => {
  const { submitFormHandler, formValues, resetForm } = props;

  submitFormHandler({ ...formValues });
  resetForm();
};

interface AddWorkoutFormProps {
  addWorkout: (workoutDetails: WorkoutDetails) => void;
}

const AddWorkoutForm = (props: AddWorkoutFormProps) => {
  const { addWorkout } = props;

  const [workoutName, onChangeText] = useState('');
  const resetForm = () => onChangeText('');

  return (
    <>
      <TextInput style={styles.input} onChangeText={onChangeText} value={workoutName} placeholder="Enter workout name" />
      <Button
        title="Add workout"
        onPress={() => submitForm({
          submitFormHandler: addWorkout,
          formValues: { name: workoutName },
          resetForm,
        })}
      />
    </>
  );
};

export default AddWorkoutForm;

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  },
});

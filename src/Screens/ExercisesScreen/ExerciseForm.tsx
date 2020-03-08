import React from 'react';
import { Formik } from 'formik';
import {
  TextInput, StyleSheet, View,
} from 'react-native';
import { ExerciseDetails } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';
import { FORM_MODES } from '../enums';
import AddButton from '../../components/AddButton';

interface ExerciseFormProps {
  onSubmitHandler: (fields: ExerciseDetails) => void;
  initialValues: ExerciseDetails;
  workout: Workout;
  dismissModal: () => void;
  formMode: FORM_MODES;
}

const defaultInitialValues: ExerciseDetails = {
  name: '',
  workoutId: null,
};

const ExerciseForm = (props: ExerciseFormProps) => {
  const {
    onSubmitHandler, workout, dismissModal, initialValues = defaultInitialValues, formMode,
  } = props;

  const buttonText = formMode === FORM_MODES.ADD
    ? `ADD ${workout.name} EXERCISE`
    : `EDIT ${workout.name} EXERCISE`;

  return (
    <Formik
      initialValues={{ ...initialValues, workoutId: workout.id }}
      onSubmit={(values, { resetForm }) => {
        onSubmitHandler(values);
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
            placeholder="e.g. Squats, Bench press, Curls"
            autoFocus
          />
          <View style={styles.buttonWrapper}>
            <AddButton
              text={buttonText}
              onPressHandler={submitForm}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default ExerciseForm;

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

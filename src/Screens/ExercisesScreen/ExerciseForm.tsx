import React from 'react';
import { Formik } from 'formik';
import {
  TextInput, StyleSheet, View,
} from 'react-native';
import { ExerciseDetails } from '../../state/ducks/exercises/types';
import { Workout } from '../../state/ducks/workouts/types';
import Button from '../../components/Button';
import { FORM_MODES } from '../enums';

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

  const buttonText = formMode === FORM_MODES.ADD ? 'Add exercise' : 'Edit exercise';

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
            placeholder={`Enter an exercise for ${workout.name}`}
            autoFocus
          />
          <View style={styles.buttonWrapper}>
            <Button
              title={buttonText}
              onPress={submitForm}
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

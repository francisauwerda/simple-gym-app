import React from 'react';
import {
  TextInput, StyleSheet, View,
} from 'react-native';
import { Formik } from 'formik';
import { WorkoutDetails } from '../../state/ducks/workouts/types';
import Button from '../../components/Button';
import { FORM_MODES } from './WorkoutsScreen';

interface WorkoutFormProps {
  onSubmitHandler: (fields: WorkoutDetails) => void;
  initialValues: WorkoutDetails;
  dismissModal: () => void;
  formMode: FORM_MODES
}

const defaultInitialValues: WorkoutDetails = {
  name: '',
};

const WorkoutForm = (props: WorkoutFormProps) => {
  const {
    onSubmitHandler, dismissModal, initialValues = defaultInitialValues, formMode,
  } = props;

  // TOOD: Move this logic to the parent
  const buttonText = formMode === FORM_MODES.ADD ? 'Add workout' : 'Edit workout';

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmitHandler(values);
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
              title={buttonText}
              onPress={submitForm}
            />
          </View>

        </>
      )}
    </Formik>
  );
};

export default WorkoutForm;

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

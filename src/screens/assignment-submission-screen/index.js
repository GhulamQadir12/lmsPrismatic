import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {TextAreaInput} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, TouchableOpacity, Alert, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addAdvanceFormValidation, addAssignmentFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {pickDocument} from 'utils';
import { STORAGEKEYS } from 'config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignmentSubmission = props => {
  const {item} = props?.route?.params;
  console.log('item in assignment submission screen', item);

  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');

  const initialValues = {
    reason: '',
    document: '',
  };

const submitAssignment = async (id, note, file) => {
  try {
    setLoading(true);
    
    // Get the authentication token
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    if (!token) {
      throw new Error('Authentication token not found. Please login again.');
    }

    // Create form data
    const formData = new FormData();
    formData.append('id', id);
    formData.append('note', note);
    
    // Append the file if it exists
    if (file && file[0]) {
      formData.append('file', {
        uri: file[0].uri,
        type: file[0].type || 'application/octet-stream',
        name: file[0].name || 'document',
      });
    }

    // Debug: Log the form data before sending
    console.log('FormData contents:', {
      id: id,
      note: note,
      file: file ? file[0].name : 'none',
      token: token
    });

    const response = await fetch('https://lms.prismaticcrm.com/api/assignment-submit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // For Laravel Sanctum or CSRF protection:
        'Accept': 'application/json',
        // Don't set Content-Type for FormData - let React Native set it with boundary
      },
      body: formData,
    });

    // Get raw response text first for debugging
    const responseText = await response.text();
    console.log('Raw server response:', responseText);

    // Check if we got redirected to login page
    if (responseText.includes('Login Here') || 
        responseText.includes('<!DOCTYPE html>') || 
        response.status === 302) {
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      let errorMessage = 'Failed to submit assignment';
      try {
        const errorData = responseText ? JSON.parse(responseText) : {};
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = responseText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Try to parse JSON response
    let result = {};
    try {
      result = responseText ? JSON.parse(responseText) : {};
      console.log("Parsed response:", result);
      
      // Additional verification
      if (!result.success && !result.id) {
        throw new Error(result.message || 'Server did not confirm successful submission');
      }
    } catch (e) {
      console.warn('Response parsing error:', e);
      if (response.ok && responseText.includes('success')) {
        // Handle plain text success responses
        console.log('Assuming success from plain text response');
      } else {
        throw new Error('Invalid server response format');
      }
    }

    // Only show success if we're confident it worked
    Alert.alert('Success', 'Assignment submitted successfully!');
    navigate('Assignment');
    
    return result;
  } catch (error) {
    console.error('Submission error:', {
      error: error.toString(),
      message: error.message,
      stack: error.stack
    });
    
    let errorMessage = error.message;
    if (errorMessage.includes('Session expired') || 
        errorMessage.includes('Authentication token')) {
      // Handle session expiration
      Alert.alert(
        'Session Expired', 
        'Please login again to continue',
        [
          {
            text: 'Login',
            onPress: () => {
              // Clear existing token and navigate to login
              AsyncStorage.removeItem(STORAGEKEYS.token);
              navigate('Login');
            }
          }
        ]
      );
    } else {
      Alert.alert(
        'Submission Failed',
        errorMessage || 'Something went wrong while submitting'
      );
    }
    
    return { error: true, message: error.message };
  } finally {
    setLoading(false);
  }
};
  const handleFormSubmit = async values => {
    console.log('Form Values:', values);

    if (!values.document || values.document.length === 0) {
      Alert.alert(
        'Missing Document',
        'Document is mandatory to submit the assignment.'
      );
      return;
    }

    Alert.alert(
      'Confirm Submission',
      `Are you sure you want to submit?\n\nNote: ${
        values.reason || 'N/A'
      }\nDocument: ${values.document[0]?.name || 'N/A'}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => {
            submitAssignment(item.id, values.reason, values.document);
          },
        },
      ]
    );
  };

  const uploadDocument = async setFieldValue => {
    try {
      const pickedDocument = await pickDocument();
      if (pickedDocument) {
        setFieldValue('document', pickedDocument);
      }
    } catch (error) {
      console.log('Document Picker Error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x title={'Submit Assignment'} />
      <KeyboardAvoidScrollview contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addAssignmentFormValidation}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            values,
            errors,
          }) => (
            <>
              <TextAreaInput
                error={touched.reason ? t(errors.reason) : ''}
                onChangeText={handleChange('reason')}
                onBlur={handleBlur('reason')}
                value={values.reason}
                label="Note :"
              />

              <Medium color={colors.primary} fontSize={mvs(16)} label={'Document:'} />

              <Row
                style={{
                  justifyContent: 'flex-start',
                  gap: mvs(20),
                  alignItems: 'center',
                  marginTop: mvs(10),
                }}>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => uploadDocument(setFieldValue)}>
                  <Row
                    style={{
                      gap: mvs(10),
                    }}>
                    <AntDesign color={colors.primary} name="upload" size={15} />
                    <Regular label={'Upload'} />
                  </Row>
                </TouchableOpacity>

                {values.document ? (
                  <View style={{width: '60%'}}>
                    <Medium
                      numberOfLines={3}
                      color={colors.primary}
                      fontSize={mvs(14)}
                      label={values.document[0]?.name}
                    />
                  </View>
                ) : (
                  <Regular
                    style={{marginTop: mvs(10)}}
                    color="gray"
                    fontSize={mvs(12)}
                    label="No document selected."
                  />
                )}

                {touched.document && errors.document && (
                  <Regular
                    color="red"
                    label={errors.document}
                    fontSize={mvs(10)}
                  />
                )}
              </Row>

              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={'Submit'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default AssignmentSubmission;
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {TextAreaInput} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppSelector} from 'hooks/use-store';
import React from 'react';
import {Alert, View} from 'react-native';
import {postHelpSupport} from 'services/api/auth-api-actions';
import {helpSupportFormValidation} from 'validations';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {useNavigation} from '@react-navigation/native';
import Medium from 'typography/medium-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from 'config/colors';


const HelpDesk = props => {
  const [loading, setLoading] = React.useState(false);
  const user = useAppSelector(s => s?.user?.userInfo);
  const navigation = useNavigation();
  const initialValues = {
    user_id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: '',
  };

  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const res = await postHelpSupport({
        user_id: values?.user_id,
        name: values?.name,
        email: values?.email,
        subject: values?.subject,
        message: values?.message,
      });

      if (res?.status) {
        Alert.alert('Success', res?.message);
        navigation?.goBack();
      }
    } catch (error) {
      console.log('Error submitting help request:', error);
      Alert.alert('Error', 'Failed to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x
        title={'Help & Support'}
        titleStyle={styles.headerTitle}
        style={styles.header}
      />

      <KeyboardAvoidScrollview contentContainerStyle={styles.keyboradscrollcontent}>
        <View style={styles.formContainer}>
          <View style={styles.welcomeSection}>
            <Icon name="support-agent" size={mvs(40)} color={colors.primary} />
            <Medium
              style={styles.welcomeText}
              label="We're here to help!"
              color={colors.primary}
              fontSize={mvs(18)}
            />
            <Medium
              style={styles.subtitle}
              label="Fill out the form below and we'll get back to you as soon as possible."
              color={colors.text}
              fontSize={mvs(14)}
              numberOfLines={2}
            />
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={helpSupportFormValidation}
            onSubmit={handleFormSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              values,
              errors,
            }) => (
              <View style={styles.formSection}>
                <Medium
                  style={styles.sectionTitle}
                  label="Contact Information"
                  color={colors.primary}
                  fontSize={mvs(16)}
                />

                <PrimaryInput
                  error={touched?.name ? errors?.name : ''}
                  label={'Full Name'}
                  isRequired={true}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values?.name}
                  placeholder="Enter your full name"
                  containerStyle={styles.inputContainer}
                  labelStyle={{color: colors.primary}}
                  leftIcon={<Icon name="person" size={mvs(20)} color={colors.primary} />}
                />

                <PrimaryInput
                  error={touched?.email ? errors?.email : ''}
                  label={'Email Address'}
                  isRequired={true}
                  editable={false}
                  isEmail={true}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values?.email}
                  placeholder="Your email address"
                  containerStyle={styles.inputContainer}
                  labelStyle={{color: colors.primary}}
                  leftIcon={<Icon name="email" size={mvs(20)} color={colors.primary} />}
                />

                <Medium
                  style={[styles.sectionTitle, {marginTop: mvs(20)}]}
                  label="How can we help you?"
                  color={colors.primary}
                  fontSize={mvs(16)}
                />

                <PrimaryInput
                  error={touched?.subject ? errors?.subject : ''}
                  label={'Subject'}
                  isRequired={true}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  value={values?.subject}
                  placeholder="Brief description of your issue"
                  containerStyle={styles.inputContainer}
                  labelStyle={{color: colors.primary}}
                  leftIcon={<Icon name="subject" size={mvs(20)} color={colors.primary} />}
                />

                <TextAreaInput
                  error={touched?.message ? errors?.message : ''}
                  label={'Message'}
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values?.message}
                  placeholder="Please describe your issue in detail..."
                  containerStyle={styles.textAreaContainer}
                  labelStyle={{color: colors.primary}}
                  numberOfLines={5}
                />

                <PrimaryButton
                  loading={loading}
                  onPress={handleSubmit}
                  title={'Send Message'}
                  containerStyle={[styles.submitButton,{
    backgroundColor: colors.primary
                  }]}
                  textStyle={styles.buttonText}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default HelpDesk;

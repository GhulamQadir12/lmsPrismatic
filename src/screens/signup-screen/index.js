import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin, onLogin2} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import {Checkbox} from 'components/atoms/checkbox';

const SignupScreen = props => {
  const [check, setCheck] = React.useState(true);
  const [check2, setCheck2] = React.useState(false);
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);

  const initialValues = {
    email: '',
    password: '',
    // fcm_token: '123456',
    // type: 'User',
  };
  const [loading, setLoading] = React.useState(false);
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      return true;
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
      return true;
    } else {
      console.log('User has notification permissions disabled');
      return false;
    }
  }
  React.useEffect(() => {
    async function requestPermission() {
      const result = await requestNotifications(['alert', 'sound', 'badge']);
      if (result.status === 'granted') {
        // Notifications allowed
      } else {
        // Notifications not allowed
      }
    }

    requestPermission();
  }, []);
  const handleFormSubmit = async value => {
    // try {
    //   // Indicate loading state
    //   const values = {
    //     username: value.email,
    //     password: value.password,
    //     grant_type: 'password',
    //     auth_type: 'webuser',
    //   };
    //   setLoading(true);

    //   console.log('Submitted values:', values);

    //   // Call the onLogin2 function with the provided values and loading handler
    //   const response = await onLogin2(values, setLoading, true);

    // console.log('Response in login screen =>', response);

    // Handle successful login (e.g., navigation or further actions)
    navigate('Drawer'); // Uncomment if navigation is ready

    // Additional operations like permission checks or token management
    // await checkApplicationPermission();
    // let fcmToken = '12345'; // Replace with actual token retrieval logic
    // try {
    //   fcmToken = await messaging().getToken();
    // } catch (error) {
    //   console.error('FCM token retrieval error:', error);
    // }

    // Dispatch login with extended data if necessary
    // dispatch(onLogin({ ...values, fcm_token: fcmToken }, setLoading, true));

    // } catch (error) {
    //   console.error('Error during form submission:', error);
    //   Alert.alert('Login Failed', 'Please check your credentials and try again.');
    // } finally {
    //   // Reset loading state
    //   setLoading(false);
    // }
    // navigate('Drawer');
  };

  return (
    <View style={styles.container}>
      {/* <Image source={loginbackgroundimg} style={styles.backgroundImage} /> */}

      <View style={styles.bottomcontainer}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboradscrollcontent}>
          <Bold
            label={'Apply Now'}
            color={colors.primary}
            fontSize={mvs(20)}
            style={styles.welcomeText}
          />
          <Regular
            fontSize={mvs(10)}
            style={styles.loginText}
            label={'Sign up To create Your Account'}
          />
          <Formik
            initialValues={initialValues}
            // validationSchema={signinFormValidation}
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
                {console.log('errror2', errors)}
                <Row style={{justifyContent: 'flex-start', gap: mvs(50)}}>
                  <Row
                    style={{
                      alignItems: 'center',
                      marginTop: mvs(20),
                      justifyContent: 'flex-start',
                      gap: mvs(20),
                    }}>
                    <Checkbox
                      onPress={() => {
                        const updatedCheck2 = false; // Toggle the state
                        setCheck2(updatedCheck2); // Update the React state
                        const updatedCheck = !check; // Toggle the state
                        setCheck(updatedCheck); // Update the React state
                        // setFieldValue('notificationStatue', updatedCheck); // Sync with Formik state
                      }}
                      checked={check} // Bind to the React state
                    />
                    <Regular label={'Local'} />
                  </Row>
                  <Row
                    style={{
                      alignItems: 'center',
                      marginTop: mvs(20),
                      justifyContent: 'flex-start',
                      gap: mvs(20),
                    }}>
                    <Checkbox
                      onPress={() => {
                        const updatedCheck = false; // Toggle the state
                        setCheck(updatedCheck);
                        const updatedCheck2 = !check2; // Toggle the state
                        setCheck2(updatedCheck2); // Update the React state
                        // setFi2eldValue('notificationStatue', updatedCheck); // Sync with Formik state
                      }}
                      checked={check2} // Bind to the React state
                    />
                    <Regular label={'Foreign'} />
                  </Row>
                </Row>
                <PrimaryInput
                  // containerStyle={{marginTop: mvs(25)}}
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('Email')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={'First name'}
                  isRequired={true}
                  labelStyle={{marginTop: mvs(20)}}
                />
                <PrimaryInput
                  // containerStyle={{marginTop: mvs(25)}}
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('e.g Ali')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={'Last name'}
                  isRequired={true}
                />
                <PrimaryInput
                  // containerStyle={{marginTop: mvs(25)}}
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('xxxxx-xxxxxxx-x')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={'CNIC'}
                  isRequired={true}
                />

                <PrimaryInput
                  // containerStyle={{marginTop: mvs(25)}}
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('3257976789  (10 digits)')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={'Mobile'}
                  isRequired={true}
                />
                <PrimaryInput
                  // containerStyle={{marginTop: mvs(25)}}
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('3257976789  (10 digits)')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={'Father/Guardian number'}
                  isRequired={true}
                />

                <PrimaryInput
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('e.g username @gmail.com')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  isEmail
                  label={'Email'}
                  isRequired={true}
                />
                <PrimaryInput
                  isPassword
                  error={touched?.password ? t(errors.password) : ''}
                  placeholder={t('e.g  Z12345Ali')}
                  // label={t('password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  containerStyle={{marginBottom: 0}}
                  errorStyle={{marginBottom: 0}}
                  label={'Password'}
                  isRequired={true}
                />
                <PrimaryInput
                  isPassword
                  error={touched?.password ? t(errors.password) : ''}
                  placeholder={t('e.g  Z12345Ali')}
                  // label={t('password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  containerStyle={{marginBottom: 0}}
                  errorStyle={{marginBottom: 0}}
                  label={'Confirm Password'}
                  isRequired={true}
                />

                <Row
                  style={{
                    alignItems: 'center',
                    marginTop: mvs(20),
                    justifyContent: 'flex-start',
                    gap: mvs(10),
                  }}>
                  <Checkbox
                    onPress={() => {
                      const updatedCheck = !check; // Toggle the state
                      setCheck(updatedCheck); // Update the React state
                      // setFieldValue('notificationStatue', updatedCheck); // Sync with Formik state
                    }}
                    checked={check} // Bind to the React state
                  />
                  <Row
                    style={{
                      marginHorizontal: mvs(20),
                    }}>
                    <Regular label={' I agree with the terms and condition of PNY Trainings.'} numberOfLines={3}/>
                  </Row>
                </Row>
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginVertical: mvs(60),
                  }}
                  loading={loading}
                  onPress={handleSubmit}
                  title={t('Apply now')}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default SignupScreen;

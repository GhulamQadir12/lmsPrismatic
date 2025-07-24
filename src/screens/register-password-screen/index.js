import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Button, Alert, StatusBar} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin, onLogin2, sendOtp, verifyToOtp} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {forgotPasswordValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import OtpModal from 'components/molecules/modals/otp-modal';

const RegisterPasswordScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [email, setEmail] = useState('');
  const [verifyLoading, setVerifyLoading] = React.useState(false); // For OTP verification button

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
  const handleFormSubmit = async values => {
    try {
      setLoading(true);
      const payload = {
        email: values.email,
        // password: values.password, // If needed later
      };
      setEmail(values.email);
      const response = await sendOtp(payload);
      console.log('Response:', response);
      // OPTIONAL: You could call an API here if needed
      // const response = await onLogin2(payload, setLoading, true);
      // console.log('API response:', response);

      // Show OTP modal
      if (response?.status == true) {
      setModalVisible(true);
      }
      // else{
      //   console.log("response?.errors?.email", response?.errors?.email);
      //   Alert.alert('Error', response?.errors?.email[0] || 'Failed to send OTP');
      // }
    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

   const verifyOtp = async () => {
   try {
     setVerifyLoading(true);
     const payload = {
       otp: parseInt(otpValue), 
       email: email, 
      };
      console.log("payload", payload)
      const res = await verifyToOtp(payload);
      if (res?.status == true) {
          setModalVisible(false);
          navigate("ResetPasswordScreen",{email: email,otp:otpValue});
      }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while verifying OTP');
      } finally {
        setVerifyLoading(false);
      }
    };

  return (
    <View style={[styles.container,{ backgroundColor: colors.primary}]}>
     <StatusBar
            translucent={false}
            backgroundColor={colors.primary}
            barStyle={'white'}
          />
      {/* <Image source={loginbackgroundimg} style={styles.backgroundImage} /> */}
      <View>
        <OtpModal
          visible={modalVisible}
          setValue={setOtpValue}
          loading={verifyLoading}
          value={otpValue}
          email={email}
          onClose={() => setModalVisible(false)}
          onPress={() => {
            verifyOtp();
          }}
        />
      </View>
      <View style={[styles.lottiecontainer,{backgroundColor: colors.primary}]}>
        <LottieView
          source={require('../../assets/lotties/lottie2.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <View style={styles.bottomContainer}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboradscrollcontent}>
          <Bold
            label={'Forgot Password'}
            color={colors.primary}
            fontSize={mvs(20)}
            style={styles.welcomeText}
          />
     
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordValidation}
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

                <PrimaryInput
                  containerStyle={{marginTop: mvs(25)}}
                  keyboardType={'email-address'}
                  error={touched?.email ? t(errors.email) : ''}
                  placeholder={t('Email')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  isEmail
                />
                {/* <PrimaryInput
                isPassword
                error={touched?.password ? t(errors.password) : ''}
                placeholder={t('password')}
                // label={t('password')}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                containerStyle={{marginBottom: 0}}
                errorStyle={{marginBottom: 0}}
              /> */}

                {/* <Row style={{alignItems: 'flex-end', paddingHorizontal: mvs(20)}}> */}
                {/* <TouchableOpacity
                  onPress={() => navigate('Login')}
                  style={{alignSelf: 'flex-end'}}
                  >
                  <Medium label={"Already have password ?"} />
                </TouchableOpacity> */}
                {/* </Row> */}
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginTop: mvs(40),
                  }}
                  loading={loading}
                  onPress={handleSubmit} // ✅ Important: triggers validation and calls handleFormSubmit
                  title={t('Send')}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidScrollview>
      </View>
    </View>
  );
};
export default RegisterPasswordScreen;

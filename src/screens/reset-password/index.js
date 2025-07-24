import {PrimaryButton} from 'components/atoms/buttons';

import {PasswordChangedAnimation} from 'assets/icons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import ForgotOtpModal from 'components/molecules/modals/forgot-otp-modal';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import LottieView from 'lottie-react-native';
import {goBack, navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import {onUpdatePassword, resetPassword} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {updatePasswordValidation} from 'validations';
import styles from './styles';
import {forgotbackgroundimg} from 'assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'react-native';

const ResetPasswordScreen = props => {
  const dispatch = useAppDispatch();
  // const {values} = props?.route?.params;
  const values = 'jas';
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    password: '',
    confirm_password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const { email, otp } = props?.route?.params || {};
  console.log('Received email:', email);
  console.log('Received OTP:', otp);
  const [verifyloading, setVerifyLoading] = React.useState(false);
  const [data, setData] = React.useState({});

const handleFormSubmit = async (values) => {
  console.log('Submitted form values:', values); // 👈 Logs the password data
  setData(values); // 👈 Save to state for later use (e.g., in OTP verify)
  setOtpModalVisible(true); // 👈 Show OTP modal for verification
};



  const handleVerify = async (values) => {
    try {
         setLoading(true);
         const payload = {
           otp: parseInt(otp), 
           email: email, 
           password: values.password,
            password_confirmation: values.confirm_password,
          };
          console.log("payload in reset", payload)
          const res = await resetPassword(payload);
          if (res?.status == true) {
              navigate('Login')
          }
          } catch (error) {
            Alert.alert('Error', 'An error occurred while verifying OTP');
          } finally {
            setLoading(false);
          }
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
     <StatusBar
            translucent={false}
            backgroundColor={colors.primary}
            barStyle={'white'}
          />
     <View style={[styles.lottiecontainer,{    backgroundColor: colors.primary}]}>
        <LottieView
          source={require('../../assets/lotties/lottie2.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

    <View style={styles.bottomcontainer}>
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboardcontentcontainer}>
        <View style={styles.contentContainerStyleNew}>
          <Formik
            initialValues={initialValues}
            validationSchema={updatePasswordValidation}
            onSubmit={handleVerify}>
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
                {!isPasswordChanged ? (
                  <>
                    <Bold
                      label={'Set Password'}
                      color={colors.primary}
                      fontSize={mvs(20)}
                      style={styles.welcomeText}
                    />

                    <PrimaryInput
                      containerStyle={{marginTop: mvs(25)}}
                      isPassword
                      error={touched?.password ? t(errors.password) : ''}
                      placeholder={'New Password'}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      errorStyle={{marginBottom: 10}}
                    />
                    <PrimaryInput
                      isPassword
                      error={
                        touched?.confirm_password
                          ? t(errors.confirm_password)
                          : ''
                      }
                      placeholder={'Retype Password'}
                      onChangeText={handleChange('confirm_password')}
                      onBlur={handleBlur('confirm_password')}
                      value={values.confirm_password}
                      containerStyle={{marginBottom: 0}}
                      errorStyle={{marginBottom: 5}}
                    />

                    <PrimaryButton
                      containerStyle={{
                        marginTop: mvs(30),
                      }}
                      loading={loading}
                      onPress={handleSubmit}
                      title={t('confirm')}
                    />
                  </>
                ) : (
                  <View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Bold label={t('password_changed')} style={styles.txt} />
                      <Bold label={t('congratulations')} style={styles.txt2} />
                      <Medium
                        label={t('you_have_successfully_changed_your_password')}
                        fontSize={mvs(16)}
                        numberOfLines={2}
                        style={{textAlign: 'center'}}
                      />
                      <LottieView
                        source={PasswordChangedAnimation}
                        autoPlay={true}
                        loop={true}
                        style={{width: mvs(200), height: mvs(200)}}
                      />
                    </View>

                    <PrimaryButton
                      containerStyle={{
                        borderRadius: mvs(10),
                      }}
                      loading={loading}
                      onPress={() => {handleVerify(values)}}
                      title={t('back_to_login')}
                    />
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidScrollview>

     
    </View>
    </View>
  );
};
export default ResetPasswordScreen;

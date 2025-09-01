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
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {onLogin} from 'services/api/auth-api-actions';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {nonStudentLoginValidation, signinFormValidation, studentLoginValidation} from 'validations';
import styles from './styles';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import LottieView from 'lottie-react-native';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as IMG from 'assets/images';
import { hexToRgba } from 'utils';

const LoginScreen = props => {
  const dispatch = useAppDispatch();
  const [rember, setRemember] = React.useState(false);
  const {is_student} = props?.route?.params || '';
  console.log('is student', is_student);

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
      await checkApplicationPermission();
      let fcmToken = '123456';
      try {
        setLoading(true);
        fcmToken = await messaging().getToken();
      } catch (error) {
        console.log('fcm token error', error);
      }
      const res = await dispatch(
        // onLogin({...values, fcm_token: fcmToken}, setLoading),
        onLogin({...values, fcm_token: fcmToken}, setLoading),
      );
      console.log('ressss', res);
    } catch (error) {
      console.log('error=>', error);
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
       <ImageBackground
        source={IMG.eduBg} // Add a beautiful education background image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[hexToRgba(colors.primary, 0.8), hexToRgba(colors.primary, 0.85)]}
          style={styles.gradientOverlay}
        >
      <View style={[styles.lottiecontainer]}>
        <LottieView
          source={require('../../assets/lotties/lottie4.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <View style={styles.bottomcontainer}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.keyboradscrollcontent}>
                    <Icon name="school" size={mvs(40)} color={colors.primary} style={{alignSelf:'center'}} />

          <Bold
            label={'Welcome Back'}
            color={colors.primary}
            fontSize={mvs(20)}
            style={styles.welcomeText}
          />
          <Regular
            fontSize={mvs(10)}
            style={[
              styles.loginText,
              {
                color: colors.cyan,
              },
            ]}
            label={'Login To Your Account'}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={
              is_student ? ( studentLoginValidation ) : ( nonStudentLoginValidation )
            }
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
                {!is_student ? (
                  <PrimaryInput
                    containerStyle={{marginTop: mvs(25)}}
                    keyboardType={'email-address'}
                    error={touched?.email ? errors?.email : ''}
                    placeholder={'cnic e.g 34567-8902797-9'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    isEmail
                  />
                ) : (
                  <PrimaryInput
                    containerStyle={{marginTop: mvs(25)}}
                    keyboardType={'email-address'}
                    error={touched?.email ? errors.email : ''}
                    placeholder={'Email'}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    isEmail
                  />
                )}
                <PrimaryInput
                  isPassword
                  error={touched?.password ? errors.password : ''}
                  placeholder={'password'}
                  // label={t('password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  containerStyle={{marginBottom: 0}}
                  errorStyle={{marginBottom: 0}}
                />

                <Row style={{alignItems: 'center', paddingHorizontal: mvs(20)}}>
                  <View></View>
                  {/* <TouchableOpacity
                  onPress={() => navigate('Signup')}
                  style={[styles.btnstyle,{ borderColor: colors.primary}]}>
                  
                  <Medium label={'Sign up?'} color={colors.primary} />
                </TouchableOpacity> */}
                  <TouchableOpacity
                    // onPress={() => navigate('ForgotPasswordScreen')}
                    onPress={() => navigate('RegisterPasswordScreen')}
                    style={[styles.btnstyle, {borderColor: colors.primary}]}>
                    <Medium label={'forgot password?'} color={colors.primary} />
                  </TouchableOpacity>
                </Row>
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginTop: mvs(60),
                  }}
                  loading={loading}
                  onPress={handleSubmit}
                  title={'Login'}
                />
              </>
            )}
          </Formik>
        </KeyboardAvoidScrollview>
      </View>
      </LinearGradient>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

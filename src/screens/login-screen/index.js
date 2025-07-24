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
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
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

const LoginScreen = props => {
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
const handleFormSubmit = async values => {
    try {
      const res = await dispatch(
        onLogin({...values}, setLoading),
      );
      console.log('ressss', res);

      // if (
      //   res?.status === false &&
      //   res.message === 'Please verify your email first'
      // ) {
      //   console.log('Condition met, setting modal visible');
      // setOtpModalVisible(true);
      // setEmail(values.email);
      // }
    } catch (error) {
      console.log('error=>', error);
      setLoading(false);
    }
  };
  
  return (
    <View style={[styles.container,{    backgroundColor: colors.primary}]}>
     <StatusBar
            translucent={false}
            backgroundColor={colors.primary}
            barStyle={'white'}
          />
      {/* <Image source={loginbackgroundimg} style={styles.backgroundImage} /> */}
<View style={[styles.lottiecontainer, {backgroundColor: colors.primary}]}>
        <LottieView
          source={require('../../assets/lotties/lottie2.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

    <View style={styles.bottomcontainer}>
     
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Bold
          label={'Welcome Back'}
          color={colors.primary}
          fontSize={mvs(20)}
          style={styles.welcomeText}
        />
        <Regular
          fontSize={mvs(10)}
          style={[styles.loginText,{
    color: colors.secondary,
          }]}
          label={'Login To Your Account'}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={signinFormValidation}
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
              <PrimaryInput
                isPassword
                error={touched?.password ? t(errors.password) : ''}
                placeholder={t('password')}
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
                  style={[styles.btnstyle,{ borderColor: colors.primary}]}>
                  <Medium label={t('forgot_password?')} color={colors.primary}/>
                </TouchableOpacity>
              </Row>
              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={handleSubmit}
                title={t('login')}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
    </View>
  );
};
export default LoginScreen;

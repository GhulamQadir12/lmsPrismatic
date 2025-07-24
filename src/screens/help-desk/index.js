import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconBranchTypeSelection,
  InputWithIconProgramTypeSelection,
  InputWithIconTypeSelection,
  TextAreaInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {getLeaveTypes, onLogin, postHelpSupport} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {helpSupportFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {pickDocument} from 'utils';
import { useNavigation } from '@react-navigation/native';
const HelpDesk = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [leaveType, setleaveTypeList] = React.useState([]);
const user = useAppSelector(s => s?.user?.userInfo);
  console.log('user in help desk', user);

  const navigation = useNavigation();

  // useEffect(() => {
  //   fetchLeaveTypeList(); // Fetch data on component mount
  // }, []);


  const initialValues = {
    user_id: user?.id || '',
    name: user?.name || '',
    email:  user?.email || '',
    subject: '',
    message: '',
  };
  

const handleFormSubmit = async (values) => {
  try {
    setLoading(true);
    const res = await postHelpSupport({
      user_id: values.user_id,
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
    
    if (res) {
      // Handle success - maybe show a success message and navigate
      Alert.alert('Success', 'Your message has been sent successfully!');
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
      <Header1x2x title={'Help & Support'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={helpSupportFormValidation}
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
  error={touched?.name ? t(errors.name) : ''}
  label={'Name'}
  isRequired={true}
  onChangeText={handleChange('name')}
  onBlur={handleBlur('name')}
  value={values.name}
/>
<PrimaryInput
  error={touched?.email ? t(errors.email) : ''}
  label={'Email'}
  isRequired={true}
  editable={false}
  isEmail={true}
  onChangeText={handleChange('email')}
  onBlur={handleBlur('email')}
  value={values.email}
/>
<PrimaryInput
  error={touched?.subject ? t(errors.subject) : ''}
  label={'Subject'}
  isRequired={true}
  onChangeText={handleChange('subject')}
  onBlur={handleBlur('subject')}
  value={values.subject}
/>
<TextAreaInput
  error={touched?.message ? t(errors.message) : ''}
  label={'Message'}
  onChangeText={handleChange('message')}
  onBlur={handleBlur('message')}
  value={values.message}
/>
              

            <PrimaryButton
  containerStyle={{
    borderRadius: mvs(10),
    marginVertical: mvs(60),
  }}
  loading={loading}
  onPress={handleSubmit}
  title={'Send'}
/>
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default HelpDesk;

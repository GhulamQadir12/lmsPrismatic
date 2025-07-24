import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconComplainTypeSelection,
  InputWithIconDepartmentSelection,
  InputWithIconEmployeeSelection,
  InputWithIconLeavesTypeSelection,
  TextAreaInput,
} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {goBack, navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {
  getDepartmentList,
  getEmployeesList,
  onLogin,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addCompliantFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Checkbox} from 'components/atoms/checkbox';
const AiChat = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [departList, setDepartList] = React.useState([]);
  const [empList, setEmpList] = React.useState([]);
  const complainType = [
    {id: 1, name: 'General'},
    {id: 2, name: 'Department'},
    {id: 3, name: 'Individuals'},
  ];

  const fetchDepartmentsList = async () => {
    try {
      // setLoading(true);
      const response = await getDepartmentList();
      // console.log('response in complain list screen :', response);
      setDepartList(response);
      // console.log('complain type List ', departList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };
  // console.log("check",check)
  // setCheck(!check);
  console.log('!check', check);

  useEffect(() => {
    fetchDepartmentsList(); // Fetch data on component mount
  }, []);
  const fetchEmployeessList = async () => {
    try {
      // setLoading(true);
      const response = await getEmployeesList();
      // console.log('response in complain list screen :', response);
      setEmpList(response);
      // console.log('complain type List ', empList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeessList(); // Fetch data on component mount
  }, []);

  const initialValues = {
    complainType: '',
    departList: '',
    empList: '',
    reason: '',
    indentity: false,
  };

  const move = async values => {
 
      navigate('BotChat');
   
  };
  const handleFormSubmit = async values => {
    if (values?.empList == '' && values?.departList == '') {
      console.log('error=>', 'error');
      return;
    }
    try {
      console.log('running values', values);
      // navigate('Drawer');
      // setLoading(true)
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };
  var newCheck = false;
  return (
    <View style={styles.container}>
      <Header1x2x title={'Start a Conversation'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addCompliantFormValidation}
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
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Your name"
                isRequired={true}
              />
              <PrimaryInput
                error={touched?.email ? t(errors.email) : ''}
                label={'Email'}
                editable={false}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Your email"
                isRequired={true}
              />
              <InputWithIconComplainTypeSelection
                label={'Select a Service'}
                isRequired={true}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  marginBottom: mvs(0),
                  // marginTop: mvs(10),
                }}
                placeholder="Select a Service"
                items={complainType}
                id={values?.complainType}
                value={values?.complainType?.name}
                onChangeText={complainType =>
                  setFieldValue('complainType', complainType)
                }
                error={touched?.complainType ? t(errors.complainType) : ''}
              />
              {console.log('values?.complainType?.id', values?.complainType)}

              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginTop: mvs(60),
                }}
                loading={loading}
                onPress={move}
                title={'Start Chat'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default AiChat;

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
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {getLeaveTypes, onLogin} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {registerCourseFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {pickDocument} from 'utils';
const RegisterCourse = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [leaveType, setleaveTypeList] = React.useState([]);

  const user = {
    name: 'Ali',
    fatherName: 'Khan',
    // cnic: '123456789',
    mobileNumber: '123456789',
  };
  const fetchLeaveTypeList = async () => {
    try {
      setLoading(true);
      const response = await getLeaveTypes('EMP-BGM-0001');
      console.log('response in leave type list screen :', response);
      setleaveTypeList(response);
      //   setallData(response);
      console.log('Leave type List ', leaveType);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveTypeList(); // Fetch data on component mount
  }, []);

  const initialValues = {
    programType: '',
    branch: '',
    name: user?.name || '',
    mobilenumber: user?.mobileNumber || '',
    cnic: user?.cnic || '',
    fathername: user?.fatherName || '',
    feestatus:''
  };
  

  const handleFormSubmit = async values => {
    try {
      // console.log('values', values.document[0].name);
      console.log('values', values);
      // navigate('Drawer');
      // setLoading(true)
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x title={'Register Course'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={registerCourseFormValidation}
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
                value={values.name} // Display the number of days
              />
              <PrimaryInput
                error={touched?.fathername ? t(errors.fathername) : ''}
                label={'Father Name'}
                isRequired={true}
                onChangeText={handleChange('fathername')}
                onBlur={handleBlur('fathername')}
                value={values.fathername} // Display the number of days
              />
              <PrimaryInput
                error={touched?.cnic ? t(errors.cnic) : ''}
                label={'CNIC'}
                isRequired={true}
                placeholder={'00000-0000000-0'}
                onChangeText={handleChange('cnic')}
                onBlur={handleBlur('cnic')}
                value={values.cnic} // Display the number of days
              />
              <PrimaryInput
                error={touched?.mobilenumber ? t(errors.mobilenumber) : ''}
                label={'Mobile Number'}
                isRequired={true}

                onChangeText={handleChange('mobilenumber')}
                onBlur={handleBlur('mobilenumber')}
                value={values.mobilenumber} // Display the number of days
              />
              <InputWithIconProgramTypeSelection
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  marginTop: mvs(10),
                }}
                placeholder="Select program"
                items={leaveType}
                id={values?.leaveType}
                value={values?.leaveType?.LeaveName}
                onChangeText={LeaveName =>
                  setFieldValue('programType', LeaveName)
                }
                error={touched?.programType ? t(errors.programType) : ''}
              />
              <InputWithIconBranchTypeSelection
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.border,
                  marginTop: mvs(10),
                }}
                placeholder="Select Branch"
                items={leaveType}
                id={values?.leaveType}
                value={values?.leaveType?.LeaveName}
                onChangeText={LeaveName =>
                  setFieldValue('leaveType', LeaveName)
                }
                error={touched?.leaveType ? t(errors.leaveType) : ''}
              />
              <PrimaryInput
                error={touched?.feestatus ? t(errors.feestatus) : ''}
                label={'Fee status'}
                placeholder={'Pending'}
                onChangeText={handleChange('feestatus')}
                onBlur={handleBlur('feestatus')}
                value={values.feestatus} // Display the number of days
                editable={false}
              />

              <PrimaryButton
                containerStyle={{
                  borderRadius: mvs(10),
                  marginVertical: mvs(60),
                }}
                // loading={loading}
                onPress={handleSubmit}
                title={'Register'}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default RegisterCourse;

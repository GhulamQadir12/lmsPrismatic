// import messaging from '@react-native-firebase/messaging';
// import {PrimaryButton} from 'components/atoms/buttons';
// import PrimaryInput, {TextAreaInput} from 'components/atoms/inputs';
// import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
// import {colors} from 'config/colors';
// import {mvs} from 'config/metrices';
// import {Formik} from 'formik';
// import {useAppDispatch} from 'hooks/use-store';
// import {navigate} from 'navigation/navigation-ref';
// import React, { useEffect } from 'react';
// import {Image, TouchableOpacity, View} from 'react-native';
// import {requestNotifications} from 'react-native-permissions';
// import {onLogin} from 'services/api/auth-api-actions';
// import i18n from 'translation';
// import Bold from 'typography/bold-text';
// import Medium from 'typography/medium-text';
// import {signinFormValidation} from 'validations';
// import styles from './styles';
// import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
// import Regular from 'typography/regular-text';
// import {Row} from 'components/atoms/row';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Header1x2x from 'components/atoms/headers/header-1x-2x';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// const WorkFromHomeRequest = props => {
//   const {t} = i18n;
//   const [rember, setRemember] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const initialValues = {
//     date_from: '',
//     date_to: '',
//     nodays: '',
//     document: '',
//     reason: '',
//   };

//   const handleFormSubmit = async values => {
//     try {
//       navigate('Drawer');
//       // setLoading(true)
//     } catch (error) {
//       console.log('error=>', error);
//     } finally {
//       // setLoading(false);
//     }
//   };

//   const calculateDaysBetween = (dateFrom, dateTo) => {
//     if (!dateFrom || !dateTo) return 0; // Return 0 if either date is not set
//     const start = new Date(dateFrom);
//     const end = new Date(dateTo);

//     // Set time to midnight to avoid timezone issues
//     start.setHours(0, 0, 0, 0);
//     end.setHours(0, 0, 0, 0);

//     const differenceInMilliseconds = end - start;
//     const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // Convert to days
//     return differenceInDays + 1; // Add 1 to include both the start and end day
//   };
//   return (
//     <View style={styles.container}>
//       <Header1x2x title={'Work From Home Request'} />
//       <KeyboardAvoidScrollview
//         contentContainerStyle={styles.keyboradscrollcontent}>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={signinFormValidation}
//           onSubmit={handleFormSubmit}>
//           {({
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             setFieldValue,
//             touched,
//             values,
//             errors,
//           }) => (
//             useEffect(() => {
//               if (values.date_from && values.date_to) {
//                 const days = calculateDaysBetween(
//                   values.date_from,
//                   values.date_to,
//                 );
//                 setFieldValue('nodays', days); 
//               }
//             }, [values.date_from, values.date_to, setFieldValue]),
//             <>
//               {console.log('errror2', errors)}

//               <PrimaryInput
//                               containerStyle={{marginTop: mvs(15)}}
//                 error={touched?.date_from ? t(errors.date_from) : ''}
//                 placeholder={'Date From'}
//                 onChangeText={handleChange('date_from')}
//                 onBlur={handleBlur('date_from')}
//                 value={values.date_from}
//                 isCalendar
//                 editable={false}
//               />
//               <PrimaryInput
//                 error={touched?.date_to ? t(errors.date_to) : ''}
//                 placeholder={'Date To'}
//                 onChangeText={handleChange('date_to')}
//                 onBlur={handleBlur('date_to')}
//                 value={values.date_to}
//                 isCalendar
//                 editable={false}
//               />
//                <PrimaryInput
//                   error={touched?.nodays ? t(errors.nodays) : ''}
//                   placeholder={'No of Days'}
//                   onChangeText={handleChange('nodays')}
//                   onBlur={handleBlur('nodays')}
//                   value={values.nodays ? values.nodays.toString() : ''} // Display the number of days
//                   editable={false}
//                 />

//               <TextAreaInput
//                 error={
//                   touched?.reason ? t(errors.reason) : ''
//                 }
//                 placeholder={'Reason'}
//                 onChangeText={handleChange('reason')}
//                 onBlur={handleBlur('reason')}
//                 value={values.reason}
//               />

//               <PrimaryButton
//                 containerStyle={{
//                   borderRadius: mvs(10),
//                   marginTop: mvs(60),
//                 }}
//                 loading={loading}
//                 onPress={handleSubmit}
//                 title={'Rise Request'}
//               />
//             </>
//           )}
//         </Formik>
//       </KeyboardAvoidScrollview>
//     </View>
//   );
// };
// export default WorkFromHomeRequest;


import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {
  InputWithIconEmployeeSelection,
  InputWithIconLeavesTypeSelection,
  InputWithIconTypeSelection,
  InputWithIconWFHSelection,
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
import {getLeaveTypes, getWorkFromHomeCategory, onLogin} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {addLeaveFormValidation, addWFHFormValidation, signinFormValidation} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {pickDocument} from 'utils';
const WorkFromHomeRequest = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [leaveType, setleaveTypeList] = React.useState([]);
  const [categoryType, setCategoryType] = React.useState([]); // Track the expanded card by its ID

  const fetchWorkFromHomeCategory = async () => {
    try {
      setLoading(true);
      const response = await getWorkFromHomeCategory();
      setCategoryType(response || []);
      console.log('WFH category', categoryType);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkFromHomeCategory(); // Fetch data on component mount
  }, []);

  const initialValues = {
    categoryType: 0,
    date_from: '',
    date_to: '',
    nodays: '',
    reason: '',
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

  const calculateDaysBetween = (dateFrom, dateTo) => {
    if (!dateFrom || !dateTo) return 0; // Return 0 if either date is not set
    const start = new Date(dateFrom);
    const end = new Date(dateTo);

    // Set time to midnight to avoid timezone issues
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const differenceInMilliseconds = end - start;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // Convert to days
    return differenceInDays + 1; // Add 1 to include both the start and end day
  };

  const currentDate = new Date();
  const startOfToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  // Format the date for display
  const getCurrentDateInCustomFormat = () => {
    return moment().format('MMMM, YYYY');
  };

  const uploadDocument = async setFieldValue => {
    try {
      const pickedDocument = await pickDocument();
      if (pickedDocument) {
        setFieldValue('document', pickedDocument);
      }
    } catch (error) {
      console.log('Document Picker Error:', error);
    }
  };

  const onPress = (setFieldValue, type) => {
    if (type === 'annual') {
      setSelected('annual');
      setFieldValue('leaveType', 'annual');
    } else if (type === 'casual') {
      setSelected('casual');
      setFieldValue('leaveType', 'casual');
    } else if (type === 'sick') {
      setSelected('sick');
      setFieldValue('leaveType', 'sick');
    }
    console.log('selected ', selected);
  };
  return (
    <View style={styles.container}>
      <Header1x2x title={'Work From Home Request'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
        <Formik
          initialValues={initialValues}
          validationSchema={addWFHFormValidation}
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
            useEffect(() => {
              if (values.date_from && values.date_to) {
                const days = calculateDaysBetween(
                  values.date_from,
                  values.date_to,
                );
                setFieldValue('nodays', days); // Update nodays value in Formik
              }
            }, [values.date_from, values.date_to, setFieldValue]),
            (
              <>
                {console.log('errror2', errors)}
            
                <InputWithIconWFHSelection
                  label={'Type'}
                  isRequired={true}
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.border,
                    // marginTop: mvs(10),
                  }}
                  placeholder="Select Type "
                  items={categoryType}
                  id={values?.categoryType}
                  value={values?.categoryType?.elem}
                  onChangeText={elem => setFieldValue('categoryType', elem)}
                  error={touched?.categoryType ? t(errors.categoryType) : ''}
                />
                
                <PrimaryInput
                  error={touched?.date_from ? t(errors.date_from) : ''}
                  placeholder={'Date From'}
                  onChangeText={handleChange('date_from')}
                  onBlur={handleBlur('date_from')}
                  value={values.date_from}
                  isCalendar
                  editable={false}
                  minimumDate={startOfToday}
                  // maximumDate={endOfMonth}
                />
                <PrimaryInput
                  error={touched?.date_to ? t(errors.date_to) : ''}
                  placeholder={'Date To'}
                  onChangeText={handleChange('date_to')}
                  onBlur={handleBlur('date_to')}
                  value={values.date_to}
                  isCalendar
                  editable={false}
                  minimumDate={
                    values.date_from ? new Date(values.date_from) : startOfToday
                  } // Minimum is "Date From" or today
                />
                <PrimaryInput
                  error={touched?.nodays ? t(errors.nodays) : ''}
                  placeholder={'No of Days'}
                  onChangeText={handleChange('nodays')}
                  onBlur={handleBlur('nodays')}
                  value={values.nodays ? values.nodays.toString() : ''} // Display the number of days
                  editable={false}
                />

                <TextAreaInput
                  error={touched?.reason ? t(errors.reason) : ''}
                  placeholder={'Reason'}
                  onChangeText={handleChange('reason')}
                  onBlur={handleBlur('reason')}
                  value={values.reason}
                />
                {/* <Medium
                  color={colors.primary}
                  fontSize={mvs(16)}
                  label={'Document:'}
                />
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
                    <Row style={{gap: mvs(10)}}>
                      <AntDesign
                        color={colors.primary}
                        name="upload"
                        size={15}
                      />
                      <Regular label={'Upload'} />
                    </Row>
                  </TouchableOpacity>
                  {values.document ? (
                    <View style={{width: '60%'}}>
                      <Medium
                        numberOfLines={3}
                        color={colors.primary}
                        fontSize={mvs(14)}
                        label={values.document[0].name}
                      />
                    </View>
                  ) : (
                    <Regular
                      style={{marginTop: mvs(10)}}
                      color="gray"
                      fontSize={mvs(12)}
                      label="No yet selected."
                    />
                  )}

                </Row>
                {touched.document && errors.document && (
                  <Regular
                    color="red"
                    label={errors.document}
                    fontSize={mvs(10)}
                  />
                )} */}
                <PrimaryButton
                  containerStyle={{
                    borderRadius: mvs(10),
                    marginTop: mvs(60),
                  }}
                  loading={loading}
                  onPress={handleSubmit}
                  title={'Raise Request'}
                />
              </>
            )
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default WorkFromHomeRequest;

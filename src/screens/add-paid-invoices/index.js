import messaging from '@react-native-firebase/messaging';
import {IconButton, PlusButton, PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import React, {useEffect} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import {
  getFinancialYear,
  getReinbursementType,
  getRequestId,
  onLogin,
} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {
  addReimbursementFormValidation,
  signinFormValidation,
} from 'validations';
import styles from './styles';
import {checkimg, forgotbackgroundimg, loginbackgroundimg} from 'assets/images';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import {pickDocument} from 'utils';
import {values} from 'lodash';
import AddReimbursementCard from 'components/molecules/add-reimbursement-card';
import moment from 'moment';

const AddPaidInvoices = props => {
  const {t} = i18n;
  const [rember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState('annual');
  const [data, setData] = React.useState([{
    ReimbursementDate : "2022-11-01",
    Amount : 1000,
    AdvancePaid : 200,
    Reason : "Travelpakistanasa",
  }]);
  const [data1, setData1] = React.useState();
  const [total, setTotal] = React.useState(0);
  const [requestId, setRequestId] = React.useState(0);
  const [reimbursementType, setReimbursementType] = React.useState([]);

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
console.log("date",today);
  const initialValues = {
    date: today,
    reimbursementDate: '',
    reimbursementType: '',
    amount: '',
    totalAmount: '',
    advancedPaid: '',
    document: '',
    reason: '',
  };

  const fetchReimbursementType = async () => {
    try {
      // setLoading(true);
      const response = await getReinbursementType();
      // console.log('fetchReimbursementType response here in screen ', response);
      setReimbursementType(response || []);
      console.log(
        'here im reimbursementType response here in screen ',
        reimbursementType,
      );
    } catch (err) {
      console.error('fetchReimbursementType Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReimbursementType(); // Fetch data on component mount
  }, []);

  const fetchFinancialYear = async () => {
    try {
      // setLoading(true);
      const response = await getFinancialYear(8);
      // console.log('response here in screen ', response[0].FinancialYear);

      const formattedDate = getCurrentDateInCustomFormat();
      // console.log(formattedDate); // e.g., "November,2024"

      const values = {
        month: formattedDate,
        year: response[0].FinancialYear,
      };
      // console.log('values', values);
      const anotherResponse = await getRequestId(values);
      // console.log('another response here in screen ', anotherResponse[2]);
      setRequestId(anotherResponse[2]);
      // setData1(response || []);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    fetchFinancialYear(); // Fetch data on component mount
  }, []);

  const handleFormSubmit = async values => {
    try {
      // navigate('Drawer');
      // navigate.goBack();
      // setLoading(true)
      console.log('values are', values);
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setLoading(false);
    }
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

  const onPress = (resetForm, values, errors, setFieldValue) => {
    const retainedDate = values.date; // Save the date value
    if (
      errors.date ||
      errors.reimbursementDate ||
      errors.amount ||
      errors.advancedPaid ||
      errors.reason
    ) {
      Alert.alert('Please fill all the fields');
    } else {
      resetForm(); // Reset the form

      // Restore the date value
      setFieldValue('date', retainedDate);

      // Parse values to numbers for arithmetic
      const amount = parseFloat(values.amount) || 0;
      const advancedPaid = parseFloat(values.advancedPaid) || 0;

      // Calculate the current reimbursement's total
      const currentTotal = amount - advancedPaid;
      const updatedTotal = total + currentTotal;
      setTotal(updatedTotal);

      // console.log('Previous Total:', total);
      // console.log('Current Total:', currentTotal);
      // console.log('Updated Total:', updatedTotal);

      // Create reimbursement object
      const reimbursement = {
        ReimbursementDate: values.reimbursementDate,
        Amount: amount,
        AdvancePaid: advancedPaid,
        Reason: values.reason,
        document: values.document[0]?.uri || '', // Handle undefined document gracefully
      };
      // Add the new reimbursement to the data array
      setData([...data, reimbursement]);
    }
  };

  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  console.log('startOfMonth', startOfMonth);
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  console.log('endOfMonth', endOfMonth);

  const getCurrentDateInCustomFormat = () => {
    return moment().format('MMMM,YYYY');
  };

  const handleDelete = index => {
    const itemToDelete = data[index];
    const updatedTotal =
      total - (itemToDelete.Amount - itemToDelete.AdvancePaid);
    setTotal(updatedTotal); // Update the total

    // Remove the reimbursement at the specified index
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };
console.log("data len",data.length);


  return (
    <View style={styles.container}>
      <Header1x2x title={'Add Paid Invoice'} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.keyboradscrollcontent}>
     
        <Formik
          initialValues={initialValues}
          validationSchema={addReimbursementFormValidation}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            touched,
            values,
            errors,
            resetForm,
          }) => (
            <>
              {console.log('errror2', errors)}

              
              <View style={{marginTop: mvs(20)}}></View>
              <PrimaryInput
                error={touched?.date ? t(errors.date) : ''}
                onChangeText={handleChange('date')}
                onBlur={handleBlur('date')}
                value={values.date}
                isCalendar
                label={'Paid Date'}
                isRequired={true}
                editable={false}
                />
              <PrimaryInput
                error={touched?.advancedPaid ? t(errors.advancedPaid) : ''}
                onChangeText={handleChange('advancedPaid')}
                onBlur={handleBlur('advancedPaid')}
                value={values.advancedPaid}
                label={'Transaction Id'}
                isRequired={true}
              />
              <PrimaryInput
                error={touched?.amount ? t(errors.amount) : ''}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount}
                isRequired={true}
                label={'Paid Amount'}
              />

              <Medium
                color={colors.primary}
                fontSize={mvs(16)}
                label={'Paid Challan:'}
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
                      color={colors.green}
                      name="upload"
                      size={mvs(18)}
                    />
                    <Regular label={'Upload'} />
                  </Row>
                </TouchableOpacity>

                {values.document ? (
                  <Medium
                    color={colors.primary}
                    fontSize={mvs(14)}
                    label={`Selected Document`}
                  />
                ) : (
                  <Regular
                    style={{marginTop: mvs(10)}}
                    color="gray"
                    fontSize={mvs(12)}
                    label="No document selected."
                  />
                )}
                {/* <Medium label={'No archive found'} /> */}
              </Row>
              {touched.document && errors.document && (
                <Regular
                  color="red"
                  label={errors.document}
                  fontSize={mvs(10)}
                />
              )}

              <View
                style={{
                  marginVertical: mvs(40),
                }}>
                <PrimaryButton
                  loading={loading}
                  onPress={handleSubmit}
                  title={'Add'}
                />
              </View>
            </>
          )}
        </Formik>

      </KeyboardAvoidScrollview>
      <View style={{marginTop: mvs(20)}}></View>
    </View>
  );
};
export default AddPaidInvoices;

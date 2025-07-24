import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React, { useEffect } from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getToBeVerifiedInvoices, getUnPaidInvoices, updateProfile, uploadImage} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import {UTILS} from 'utils';
import {updateProfileFormValidation} from 'validations';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {Image} from 'react-native';
import {navigate} from 'navigation/navigation-ref';
import { useIsFocused } from '@react-navigation/native';
import UnPaidInvoicesCard from 'components/molecules/un-paid-invoices-card';
import { Loader } from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import TobeVerifiedInvoicesCard from 'components/molecules/to-be-verified-invoices-card';


const TobeVerifiedInvoiceList = props => {
  const [loading, setLoading] = React.useState(false);
  const [profileBtnLoading, setProfileBtnLoading] = React.useState(false);
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;
  console.log('user ifno===>', userInfo);
  const {countries} = user;
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [firstname, setfirstname] = React.useState();
  const [password, setpassword] = React.useState();
  const [role, setRole] = React.useState(false);
  const [tobeverifiedInvoices, setTobeverifiedInvoices] = React.useState([]);
const isFocused = useIsFocused();

  const fetchTobeVerifiedInvoicesList = async () => {
    try {
      setLoading(true);
      const response = await getToBeVerifiedInvoices();
      setTobeverifiedInvoices(response?.invoices || []);
      console.log('tobe-verified Invoices===>', tobeverifiedInvoices);
      //   setallData(response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchTobeVerifiedInvoicesList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item}) => <TobeVerifiedInvoicesCard item={item} />;

  const intrestedList = [
    {id: 1, name: 'Social Marketing'},
    // {id: 2, name: 'SEO '},
    // {id: 3, name: 'Programming'},
  ];

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'To be verified invoices'} />
     {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={tobeverifiedInvoices}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(70),
              // paddingHorizontal: mvs(20),
            }}
          />
        )}
      <TouchableOpacity
          onPress={() => navigate('AddPaidInvoices')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
    </View>
  );
};
export default TobeVerifiedInvoiceList;

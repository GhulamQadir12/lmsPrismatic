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
import {getUnPaidInvoices, updateProfile, uploadImage} from 'services/api/auth-api-actions';
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


const UnpaidFeeInvoiceList = props => {
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
  const [unpaidInvoices, setUnpaidInvoices] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [loadingMore, setLoadingMore] = React.useState(false);
      const [total, setTotal] = React.useState(0);
const isFocused = useIsFocused();

  const fetchUnpaidInvoicesList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await getUnPaidInvoices(pageNum);

      const newInvoices = response?.invoices || [];

      if (pageNum === 1) {
        setUnpaidInvoices(newInvoices);
        setTotal(response?.total_invoices || 0);
      } else {
        setUnpaidInvoices(prev => [...prev, ...newInvoices]);
      }

      // handle pagination
      const pagination = response?.pagination;
      setHasNextPage(pagination?.next_page_url !== null);
      setPage(pagination?.current_page || 1);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // const fetchUnpaidInvoicesList = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getUnPaidInvoices();
  //     setUnpaidInvoices(response?.invoices || []);
  //     console.log('unpaid Invoices===>', unpaidInvoices);
  //     //   setallData(response);
  //   } catch (err) {
  //     console.error('Failed to fetch data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (isFocused) {
      fetchUnpaidInvoicesList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item}) => <UnPaidInvoicesCard item={item} />;

  const intrestedList = [
    {id: 1, name: 'Social Marketing'},
    // {id: 2, name: 'SEO '},
    // {id: 3, name: 'Programming'},
  ];

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Unpaid Invoices'} />
        <Row
        style={{
          justifyContent: 'center',
          marginHorizontal: mvs(20),
          marginVertical: mvs(10),
          gap: mvs(20),
        }}>
        <Bold
          label={t('Total Paid Invoices :')}
          color={colors.red}
          fontSize={mvs(20)}
        />

        <Bold label={total || 0} fontSize={mvs(20)} color={colors.red} />
      </Row>
     {loading ? (
          <Loader />
        ) : (
              <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={unpaidInvoices}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchUnpaidInvoicesList(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader /> : null}
        />
        )}
      {/* <TouchableOpacity
          onPress={() => navigate('AddPaidInvoices')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity> */}
    </View>
  );
};
export default UnpaidFeeInvoiceList;

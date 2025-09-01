import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {getFeesPaid} from 'services/api/auth-api-actions';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import PaidInvoicesCard from 'components/molecules/paid-invoices-card';

const FeeInvoiceList = props => {
  const [loading, setLoading] = React.useState(false);
  const [paidInvoices, setPaidInvoices] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [expandedId, setExpandedId] = React.useState(null);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const isFocused = useIsFocused();

  const fetchPaidFeeInvoicesList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const response = await getFeesPaid(pageNum);
      const newInvoices = response?.invoices || [];
      if (pageNum === 1) {
        setPaidInvoices(newInvoices);
        setTotal(response?.total_invoices || 0);
      } else {
        setPaidInvoices(prev => [...prev, ...newInvoices]);
      }
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

  useEffect(() => {
    if (isFocused) {
      fetchPaidFeeInvoicesList();
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <PaidInvoicesCard item={item} invoiceNumber={index + 1}  isExpanded={expandedId === item.id}
    onToggle={() => handleToggle(item.id)}/>
  );
useEffect(() => {
  if (paidInvoices?.length > 0 && expandedId === null) {
    setExpandedId(paidInvoices[0]?.id);
  }
}, [paidInvoices]);

const handleToggle = (itemId) => {
  setExpandedId(prevId => prevId === itemId ? null : itemId);
};
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Paid Invoices'} />
      <View
        style={{
          marginHorizontal: mvs(20),
          marginVertical: mvs(10),
          alignSelf: 'center',
        }}>
        <Bold
          label={`${total} Total Paid Invoices`}
          color={colors.primary}
          fontSize={mvs(20)}
        />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={paidInvoices || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchPaidFeeInvoicesList(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader /> : null}
        />
      )}
    </View>
  );
};
export default FeeInvoiceList;

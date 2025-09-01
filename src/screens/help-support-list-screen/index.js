import {PlusButton} from 'components/atoms/buttons';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {getHelpSupportList} from 'services/api/auth-api-actions';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {useIsFocused} from '@react-navigation/native';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import HelpSupportCard from 'components/molecules/help-support-card';
import {navigate} from 'navigation/navigation-ref';

const HelpSupportList = props => {
  const [loading, setLoading] = React.useState(false);
  const [helpsupport, setHelpSupport] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const isFocused = useIsFocused();

  const fetchHelpSupportList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const response = await getHelpSupportList(pageNum);
      const newHelpSupport = response?.data || [];
      if (pageNum === 1) {
        setHelpSupport(newHelpSupport);
        setTotal(response?.total || 0);
      } else {
        setHelpSupport(prev => [...prev, ...newHelpSupport]);
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
      fetchHelpSupportList();
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <HelpSupportCard item={item} numberId={index + 1} isExpanded={expandedId === item?.id}
    onToggle={() => handleToggle(item?.id)}/>
  );
useEffect(() => {
  if (helpsupport?.length > 0 && expandedId === null) {
    setExpandedId(helpsupport[0]?.id);
  }
}, [helpsupport]);

const handleToggle = (itemId) => {
  setExpandedId(prevId => prevId === itemId ? null : itemId);
};
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Help & Support'} />
   
        <View
             style={{
               marginHorizontal: mvs(20),
               marginVertical: mvs(10),
               alignSelf:'center'
             }}>
             <Bold
               label={`${total} Support Queries`}
               color={colors.primary}
               fontSize={mvs(20)}
             />
     
           </View>
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={helpsupport || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchHelpSupportList(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader /> : null}
        />
      )}
      <PlusButton
        containerStyle={[
          styles.containerStyle,
          {backgroundColor: colors.primary},
        ]}
        textStyle={styles.textStyle}
        onPress={() => navigate('HelpDesk')}
      />
    </View>
  );
};
export default HelpSupportList;

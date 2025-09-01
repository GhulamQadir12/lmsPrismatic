import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {View, RefreshControl} from 'react-native';
import {getQuizes} from 'services/api/auth-api-actions';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {useIsFocused} from '@react-navigation/native';
import QuizesCard from 'components/molecules/quizes-card';
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {navigate} from 'navigation/navigation-ref';
import { useAppSelector } from 'hooks/use-store';

const Quiz = props => {
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [quizes, setQuizes] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);
  const isFocused = useIsFocused();
  const role = useAppSelector(s => s?.user?.role);
  console.log('user role in assign', role);

  const fetchQuizezList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const response = await getQuizes(pageNum);
      const newQuizes = response?.data || [];
      if (pageNum === 1) {
        setQuizes(newQuizes);
        setTotal(response?.total_quizzes || 0);
      } else {
        setQuizes(prev => [...prev, ...newQuizes]);
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

  useEffect(() => {
    if (isFocused) {
      fetchQuizezList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchQuizezList(1); // reload first page
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };
// Auto-expand first item when data loads
useEffect(() => {
  if (quizes?.length > 0 && expandedId === null) {
    setExpandedId(quizes[0]?.id);
  }
}, [quizes]);

const handleToggle = (itemId) => {
  setExpandedId(prevId => prevId === itemId ? null : itemId);
};
  const renderItem = ({item, index}) => (
    <QuizesCard item={item} questionNumber={index + 1} role={role} isExpanded={expandedId === item?.id}
    onToggle={() => handleToggle(item?.id)}/>
  );
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Quiz'} />
      
      <View
        style={{
          marginHorizontal: mvs(20),
          marginVertical: mvs(10),
          alignSelf: 'center',
        }}>
        <Bold
          label={`${total} Total Quizes`}
          color={colors.primary}
          fontSize={mvs(20)}
        />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={quizes || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
            marginTop:mvs(15)
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchQuizezList(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader /> : null}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};
export default Quiz;

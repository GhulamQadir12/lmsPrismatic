import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {getDailyPlanner} from 'services/api/auth-api-actions';
import i18n from 'translation';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import DailyPannerCard from 'components/molecules/daily-planner-card';

const DailyPlanner = props => {
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [dailyPlanner, setDailyPlanner] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchDailyPlannerList();
    }
  }, [isFocused]);

  const fetchDailyPlannerList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const response = await getDailyPlanner(pageNum);
      const newQuizes = response?.data || [];
      if (pageNum === 1) {
        setDailyPlanner(newQuizes);
        setTotal(response?.total_quizzes || 0);
      } else {
        setDailyPlanner(prev => [...prev, ...newQuizes]);
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
// Auto-expand first item when data loads
useEffect(() => {
  if (dailyPlanner?.length > 0 && expandedId === null) {
    setExpandedId(dailyPlanner[0]?.id);
  }
}, [dailyPlanner]);

const handleToggle = (itemId) => {
  setExpandedId(prevId => prevId === itemId ? null : itemId);
};
  const renderItem = ({item,index}) => <DailyPannerCard questionNumber={index + 1} item={item} isExpanded={expandedId === item?.id}
    onToggle={() => handleToggle(item?.id)}/>;

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Daily Planner'} />
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={dailyPlanner || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
            marginTop:mvs(10)
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchDailyPlannerList(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader /> : null}
        />
      )}
    </View>
  );
};
export default DailyPlanner;

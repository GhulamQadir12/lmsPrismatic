import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {View, RefreshControl} from 'react-native';
import {getAssignments} from 'services/api/auth-api-actions';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import AssignmentsCard from 'components/molecules/assignments-card';
import {useAppSelector} from 'hooks/use-store';

const Assignment = props => {
  const [loading, setLoading] = React.useState(false);
  const [assignments, setAssignments] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);
  const isFocused = useIsFocused();
  const role = useAppSelector(s => s?.user?.role);
  console.log('user role in assign', role);

  const fetchAssignmentsList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const response = await getAssignments(pageNum);
      const newLectures = response?.assignments || [];
      if (pageNum === 1) {
        setAssignments(newLectures);
        setTotal(response?.total_assignments || 0);
      } else {
        setAssignments(prev => [...prev, ...newLectures]);
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
      fetchAssignmentsList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <AssignmentsCard
      item={item}
      questionNumber={index + 1}
      role={role}
      isExpanded={expandedId === item.id}
      onToggle={() => handleToggle(item.id)}
    />
  );
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchAssignmentsList(); // reload first page
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    if (assignments.length > 0 && expandedId === null) {
      setExpandedId(assignments[0]?.id);
    }
  }, [assignments]);

  const handleToggle = itemId => {
    setExpandedId(prevId => (prevId === itemId ? null : itemId));
  };
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Assignments'} />
      <View
        style={{
          marginHorizontal: mvs(20),
          marginVertical: mvs(10),
          alignSelf: 'center',
        }}>
        <Bold
          label={`${total} Total Assignments`}
          color={colors.primary}
          fontSize={mvs(20)}
        />
      </View>
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={assignments || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchAssignmentsList(page + 1);
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
export default Assignment;

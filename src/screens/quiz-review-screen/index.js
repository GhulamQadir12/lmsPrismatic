import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {getquizReview} from 'services/api/auth-api-actions';
import Medium from 'typography/medium-text';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Regular from 'typography/regular-text';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import QuizeReviewCard from 'components/molecules/quizes-review-card';

const QuizReview = props => {
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [quizes, setQuizes] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const isFocused = useIsFocused();

  const fetchQuizReviewList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      const response = await getquizReview(
        pageNum,
        props?.route?.params?.quizId,
      );
      const newQuizes = response || {};
      if (pageNum === 1) {
        setQuizes(newQuizes);
        setTotal(newQuizes?.total_quizzes || 0);
      } else {
        setQuizes(prev => ({
          ...prev,
          questions: [
            ...(prev?.questions || []),
            ...(newQuizes?.questions || []),
          ],
        }));
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
      fetchQuizReviewList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <QuizeReviewCard item={item} questionNumber={index + 1} />
  );
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Quiz Review'} />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}> */}
      <View style={{flexGrow: 1, paddingBottom: mvs(100)}}>
        {loading ? (
          <Loader />
        ) : (
          <View>
            <View
              style={{
                marginTop: mvs(10),
                alignItems: 'center',
              }}>
              <View
                style={{
                  maxWidth: '80%',
                  backgroundColor: colors.white,
                  paddingHorizontal: mvs(15),
                  paddingVertical: mvs(10),
                  borderRadius: mvs(5),
                  shadowColor: colors.shadowColor,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Medium
                  fontSize={mvs(16)}
                  color={colors.primary}
                  label={quizes?.quiz_info?.title || 'N/A'}
                  numberOfLines={3}
                />
              </View>
            </View>
            <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={quizes?.questions || []}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: mvs(70),
                marginVertical: mvs(5),
              }}
              onEndReached={() => {
                if (!loadingMore && hasNextPage) {
                  fetchQuizReviewList(page + 1);
                }
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loadingMore ? <Loader /> : null}
            />
          </View>
        )}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};
export default QuizReview;

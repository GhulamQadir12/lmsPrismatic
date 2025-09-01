import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {getVideoTutorials} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import CustomFlatList from 'components/atoms/custom-flatlist';
import VideoCard from 'components/molecules/video-card';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';
import {RefreshControl} from 'react-native';

const VideoTutorials = props => {
  const [loading, setLoading] = React.useState(false);
  const [videosList, setVideos] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchVideosList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      console.log('count her===>', pageNum, hasNextPage);

      const response = await getVideoTutorials(pageNum);

      const newVideo = response?.data || [];

      if (pageNum === 1) {
        setVideos(newVideo);
        setTotal(response?.total_videos_lectures || 0);
      } else {
        setVideos(prev => [...prev, ...newVideo]);
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
      fetchVideosList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchVideosList(); // reload first page
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onPress = () => {
    UTILS.openYoutubeLink();
  };

  const renderitem = ({item}) => <VideoCard item={{...item}} />;
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Uploaded Videos'} />
      {/* <Row
        style={{
          justifyContent: 'center',
          marginHorizontal: mvs(20),
          marginVertical: mvs(10),
          gap: mvs(20),
        }}>
        <Bold
          label={'Total Videos :'}
          color={colors.red}
          fontSize={mvs(20)}
        />

        <Bold label={total || 0} fontSize={mvs(20)} color={colors.red} />
      </Row> */}
      <View
             style={{
               marginHorizontal: mvs(20),
               marginVertical: mvs(10),
               alignSelf:'center'
             }}>
             <Bold
               label={`${total} Total Videos`}
               color={colors.primary}
               fontSize={mvs(20)}
             />
     
           </View>
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={videosList || []}
          renderItem={renderitem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
            paddingHorizontal:mvs(20)
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchVideosList(page + 1);
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
export default VideoTutorials;

import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React, {useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  getVideoTutorials,
  updateProfile,
  uploadImage,
} from 'services/api/auth-api-actions';
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
import CustomFlatList from 'components/atoms/custom-flatlist';
import VideoCard from 'components/molecules/video-card';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from 'components/atoms/loader';

const VideoTutorials = props => {
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
  const [company, setCompany] = React.useState(false);
  const [videosList, setVideos] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const isFocused = useIsFocused();

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

  // const fetchVideosList = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getVideoTutorials();
  //     setVideos(response?.data || []);
  //     console.log("videos===>", videosList);
  //     //   setallData(response);
  //   } catch (err) {
  //     console.error('Failed to fetch data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (isFocused) {
      fetchVideosList(); // Fetch data on component mount
    }
  }, [isFocused]);
  const intrestedList = [
    {id: 1, name: 'Social Marketing'},
    {id: 2, name: 'SEO '},
    {id: 3, name: 'Programming'},
  ];

  // const videos = [
  //   {
  //     id: 1,
  //     name: 'Diploma web dev',
  //     url: 'https://youtu.be/M0r_rhoGV2w?si=xoWNzXnq9jne-gJ8',
  //     thumbnail: IMG.thumbnail,
  //   },
  //   {
  //     id: 2,
  //     name: 'Diploma web dev',
  //     url: 'https://youtu.be/M0r_rhoGV2w?si=xoWNzXnq9jne-gJ8',
  //     thumbnail: IMG.thumbnail,
  //   },
  //   {
  //     id: 3,
  //     name: 'Diploma web dev',
  //     url: 'https://youtu.be/M0r_rhoGV2w?si=xoWNzXnq9jne-gJ8',
  //     thumbnail: IMG.thumbnail,
  //     },
  //   {
  //     id: 4,
  //     name: 'Diploma web dev',
  //     url: 'https://youtu.be/M0r_rhoGV2w?si=xoWNzXnq9jne-gJ8',
  //     thumbnail: IMG.thumbnail,
  //     },
  // ];
  // const openYouTube = () => {
  //   const url = 'https://youtu.be/M0r_rhoGV2w?si=xoWNzXnq9jne-gJ8';
  //   Linking.openURL(url).catch(err => console.error("Couldn't open URL", err));
  // };
  const onPress = () => {
    UTILS.openYoutubeLink();
  };
  const renderitem = ({item}) => <VideoCard item={{...item}} />;
  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Uploaded Video Lectures'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Row
          style={{
            justifyContent: 'center',
            marginHorizontal: mvs(20),
            marginVertical: mvs(10),
            gap: mvs(20),
          }}>
          <Bold
            label={t('Total Videos Lectures :')}
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
            data={videosList}
            renderItem={renderitem}
            contentContainerStyle={{
              paddingBottom: mvs(70),
            }}
            onEndReached={() => {
              if (!loadingMore && hasNextPage) {
                fetchVideosList(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <Loader /> : null}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default VideoTutorials;

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
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  getQuizes,
  getquizReview,
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
import {useIsFocused} from '@react-navigation/native';
import QuizesCard from 'components/molecules/quizes-card';
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer'; // Import react-native-file-viewer
import {navigate} from 'navigation/navigation-ref';
import QuizeReviewCard from 'components/molecules/quizes-review-card';

const QuizReview = props => {
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        {loading ? (
          <Loader />
        ) : (
          <View>
         <Row style={{justifyContent: 'flex-start', marginTop: mvs(10),paddingHorizontal: mvs(20),marginBottom:mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                fontSize={mvs(18)}
                color={colors.black}
                label={'Quiz Title :'}
                numberOfLines={3}
              />
            </View>
            <View style={{flex: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(16)}
                color={colors.primary}
                label={quizes?.quiz_info?.title || ''}
                numberOfLines={3}
              />
            </View>
          </Row>
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={quizes?.questions || []}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(70),
              marginVertical: mvs(10),
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
      </ScrollView>
    </View>
  );
};
export default QuizReview;

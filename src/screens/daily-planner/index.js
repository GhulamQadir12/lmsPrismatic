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
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getDailyPlanner, updateProfile, uploadImage} from 'services/api/auth-api-actions';
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
import { navigate } from 'navigation/navigation-ref';
import { useIsFocused } from '@react-navigation/native';
import { Loader } from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import DailyPannerCard from 'components/molecules/daily-planner-card';

const DailyPlanner = props => {
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
  const [dailyPlanner, setDailyPlanner] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);

   const isFocused = useIsFocused();
  
    // const fetchDailyPlannerList = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await getDailyPlanner();
    //     setDailyPlanner(response?.session || []);
    //     console.log("daily Planner===>", dailyPlanner);
    //     //   setallData(response);
    //   } catch (err) {
    //     console.error('Failed to fetch data', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
    useEffect(() => {
      if (isFocused) {
        fetchDailyPlannerList(); // Fetch data on component mount
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

  const renderItem = ({item}) => <DailyPannerCard item={item} />;

  return (
   <View style={styles.container}>
  <Header1x2x back={true} title={'Daily Planner'} />
  <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
    {/* {dailyPlanner ? (
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => {
          navigate('DailyPlannerDetail', { dailyPlanner: dailyPlanner});
        }}>
        <View style={styles.documentContainer}>
          <Medium
            label={dailyPlanner?.program_name || 'N/A'}
            fontSize={22}
            color={colors.primary}
            numberOfLines={3}
          />
        </View>
        <Row style={{justifyContent: 'flex-start', marginTop: mvs(15)}}>
          <View style={{width: '35%'}}>
            <Regular
              fontSize={mvs(17)}
              color={colors.placeholder}
              label={'Branch :'}
            />
          </View>
          <View style={{flex: 1, maxWidth: '60%'}}>
            <Medium
              fontSize={mvs(15)}
              color={colors.primary}
              label={dailyPlanner?.city_name || 'N/A'}
              numberOfLines={3}
            />
          </View>
        </Row>
        <Row style={{justifyContent: 'flex-start', marginTop: mvs(15)}}>
          <View style={{width: '35%'}}>
            <Regular
              fontSize={mvs(17)}
              color={colors.placeholder}
              label={'Batch :'}
            />
          </View>
          <View style={{flex: 1, maxWidth: '60%'}}>
            <Medium
              fontSize={mvs(15)}
              color={colors.primary}
              label={dailyPlanner?.session || 'N/A'}
              numberOfLines={3}
            />
          </View>
        </Row>
      </TouchableOpacity>
    ) : null} */}
    {loading ? (
              <Loader />
            ) : (
              <CustomFlatList
                showsVerticalScrollIndicator={false}
                data={dailyPlanner}
                renderItem={renderItem}
                contentContainerStyle={{
                  paddingBottom: mvs(70),
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
  </ScrollView>
</View>

  );
};
export default DailyPlanner;

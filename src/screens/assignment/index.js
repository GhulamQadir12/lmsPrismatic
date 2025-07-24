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
  getAssignments,
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
import {Loader} from 'components/atoms/loader';
import CustomFlatList from 'components/atoms/custom-flatlist';
import AssignmentsCard from 'components/molecules/assignments-card';

const Assignment = props => {
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
  const [assignments, setAssignments] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  const isFocused = useIsFocused();

  // const fetchAssignmentsList = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getAssignments();
  //     setAssignments(response?.assignments || []);
  //     console.log('assignments===>', assignments);
  //     //   setallData(response);
  //   } catch (err) {
  //     console.error('Failed to fetch data', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
      fetchAssignmentsList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item}) => <AssignmentsCard item={item} />;

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Assignments'} />
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
            label={t('Total Assignments :')}
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
            data={assignments}
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
          />
        )}
        {/* <View style={styles.infoContainer}>
     
        <Row>
          <View style={{flex: 1}}>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Lecture :'}
                />
              </View>
              <View style={{flex: 1,maxWidth:'60%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'diploma web updated'}
                  numberOfLines={3}
                />
              </View>
            </Row>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Faculty :'}
                />
              </View>
              <View style={{flexGrow: 1,maxWidth:'60%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'Zuhair Zafar'}
                  numberOfLines={3}
                />
              </View>
            </Row>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Subject :'}
                />
              </View>
              <View style={{flexGrow: 1,maxWidth:'60%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'Diploma in Advance Web Pakistan'}
                  numberOfLines={3}
                />
              </View>
            </Row>       
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Batch :'}
                />
              </View>
              <View style={{flexGrow: 1,maxWidth:'60%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'Batch: 33'}
                  numberOfLines={3}
                />
              </View>
            </Row>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Date :'}
                />
              </View>
              <View style={{flexGrow: 1}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'30-10-2025'}
                />
              </View>
            </Row>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Uploaded file :'}
                />
              </View>
              <View style={{flexGrow: 1,maxWidth:'60%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'5698745.pdf'}
                  style={{textDecorationLine:'underline'}}
                  numberOfLines={3}
                />
              </View>
            </Row>
          
          </View>
        </Row>
      </View> */}
      </ScrollView>
    </View>
  );
};
export default Assignment;

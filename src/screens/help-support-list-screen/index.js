import * as IMG from 'assets/images';
import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
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
  getHelpSupportList,
  getLectures,
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
import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import LectureNotesCard from 'components/molecules/lecture-notes-card';
import HelpSupportCard from 'components/molecules/help-support-card';
import { navigate } from 'navigation/navigation-ref';

const HelpSupportList = props => {
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
  const [helpsupport, setHelpSupport] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
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
      fetchHelpSupportList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item}) => <HelpSupportCard item={item} />;

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Help & Support'} />
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
            label={t('Support Queries :')}
            color={colors.red}
            fontSize={mvs(20)}
            numberOfLines={2}
          />

          <Bold label={total || 0} fontSize={mvs(20)} color={colors.red} />
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={helpsupport}
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
      </ScrollView>
         <PlusButton
                          containerStyle={[styles.containerStyle,{backgroundColor: colors.primary}]}
                          textStyle={styles.textStyle}
                            onPress={() => navigate('HelpDesk')}
                          
                        />
    </View>
  );
};
export default HelpSupportList;

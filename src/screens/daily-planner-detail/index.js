import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import Primaryinput from 'components/atoms/inputs/index';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {updateProfile, uploadImage} from 'services/api/auth-api-actions';
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
import { useRoute } from '@react-navigation/native';
import moment from 'moment';


const DailyPlannerDetail = props => {
    const route = useRoute();

  const { dailyPlanner } = route.params || {}
  console.log("data in daily planner detail===>", dailyPlanner);
  const dateTimeString = dailyPlanner?.created_at;
  const dateOnly = moment(dateTimeString).format("YYYY-MM-DD");
  const startDateString = dailyPlanner?.start_date;
  const dateOnly2 = moment(dateTimeString).format("YYYY-MM-DD");
  const endDateString = dailyPlanner?.end_date;
  const dateOnly3 = moment(dateTimeString).format("YYYY-MM-DD");
  console.log(dateOnly); // Output: 2025-07-08
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
  const [date, setDate] = React.useState('');

  const intrestedList = [
    {id: 1, name: 'Social Marketing'},
    {id: 2, name: 'SEO '},
    {id: 3, name: 'Programming'},
  ];

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Daily Planner'} />
      {/* <View style={{padding: mvs(20)}}>
      <Row style={{alignItems: 'center'}}>
        <Primaryinput
          value={dateOnly}
          onChangeText={x => setDate(x)}
          placeholder="From Date"
          isCalendar
          editable={false}
          mainContainer={{width: '47%'}}
        />
        <Primaryinput
          value={date}
          onChangeText={x => setDate(x)}
          placeholder="To Date"
          isCalendar
          editable={false}
          mainContainer={{width: '47%'}}
        />
      </Row>
      <PrimaryButton containerStyle={styles.searchButton} title="Filter" />
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
         
          <Row>
            <View style={{flex: 1}}>
              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <View style={{width: '35%'}}>
                  <Regular
                    numberOfLines={3}
                    fontSize={mvs(16)}
                    color={colors.placeholder}
                    label={'Date :'}
                  />
                </View>
                <View style={{flexGrow: 1}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={dateOnly || 'N/A'}
                  />
                </View>
              </Row>
              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <View style={{width: '35%'}}>
                  <Regular
                    fontSize={mvs(16)}
                    color={colors.placeholder}
                    label={'Subject :'}
                  />
                </View>
                <View style={{flex: 1, maxWidth: '60%'}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={dailyPlanner?.program_name || 'N/A'}
                    numberOfLines={3}
                  />
                </View>
              </Row>
              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <View style={{width: '35%'}}>
                  <Regular
                    numberOfLines={3}
                    fontSize={mvs(16)}
                    color={colors.placeholder}
                    label={'Instructor :'}
                  />
                </View>
                <View style={{flexGrow: 1, maxWidth: '60%'}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={dailyPlanner?.faculty_name || 'N/A'}
                    numberOfLines={3}
                  />
                </View>
              </Row>
              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <View style={{width: '35%'}}>
                  <Regular
                    numberOfLines={3}
                    fontSize={mvs(16)}
                    color={colors.placeholder}
                    label={'Start/End :'}
                  />
                </View>
                <View style={{flexGrow: 1, maxWidth: '60%'}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={`${dateOnly2} / ${dateOnly3}` || 'N/A'}
                    numberOfLines={3}
                  />
                </View>
              </Row>
              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <View style={{width: '35%'}}>
                  <Regular
                    numberOfLines={3}
                    fontSize={mvs(16)}
                    color={colors.placeholder}
                    label={'Status :'}
                  />
                </View>
                <View style={{flexGrow: 1, maxWidth: '60%'}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={dailyPlanner?.status || 'N/A'}
                    numberOfLines={3}
                  />
                </View>
              </Row>

              <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                <View style={{width: '35%'}}>
                  <Regular
                    numberOfLines={3}
                    fontSize={mvs(16)}
                    color={colors.placeholder}
                    label={'Room :'}
                  />
                </View>
                <View style={{flexGrow: 1, maxWidth: '60%'}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={dailyPlanner?.room || 'N/A'}
                    numberOfLines={3}
                  />
                </View>
              </Row>
            </View>
          </Row>
        </View>
      </ScrollView>
    </View>
  );
};
export default DailyPlannerDetail;

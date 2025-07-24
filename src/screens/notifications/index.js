import CustomFlatList from 'components/atoms/custom-flatlist';
import {EmptyList} from 'components/atoms/empty-list';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import moment from 'moment';
import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import {getNotifications, onReadNotification} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import Bold from 'typography/bold-text';
import { StatusBar } from 'react-native';

const Notifications = props => {
  const dispatch = useAppDispatch();
  const [notification, setNotification] = React.useState([]);
  // const {userInfo, notifications} = useAppSelector(s => s.user);

  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

   const isFocused = useIsFocused();

  const fetchNotificationList = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      setNotification(response?.notifications || []);
      console.log("notification===>", notification);
      //   setallData(response);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchNotificationList(); // Fetch data on component mount
    }
  }, [isFocused]);

  // const notifications = [
  //   {
  //     id: '1',
  //     title: ' New Notification',
  //     text: 'This is a new notification',
  //     created_at: '2021-09-01 12:00:00',
  //     is_read: '0',
  //   },
  //   {
  //     id: '2',
  //     title: 'New Notification',
  //     text: 'This is a new notification',
  //     created_at: '2021-09-01 12:00:00',
  //     is_read: '0',
  //   },
  //   {
  //     id: '3',
  //     title: 'New Notification',
  //     text: 'This is a new notification',

  //     created_at: '2021-09-01 12:00:00',
  //     is_read: '0',
  //   },
  //   {
  //     id: '4',
  //     title: 'New Notification',
  //     text: 'This is a new notification',
  //     created_at: '2021-09-01 12:00:00',
  //     is_read: '0',
  //   },
  // ];


  // const readNotification = async () => {
  //   try {
  //     const unreadNoti = notifications
  //       ?.filter(x => x?.is_read == '0')
  //       ?.map(x => x?.id);

  //     if (!unreadNoti?.length) return;
  //     await onReadNotification(unreadNoti);
  //   } catch (error) {
  //     console.log('error in read notification', UTILS.returnError(error));
  //     Alert.alert('', UTILS.returnError(error));
  //   }
  // };

  // React.useEffect(() => {
  //   readNotification();
  // });

  useEffect(() => {}, []);
  const renderAppointmentItem = ({item, index}) => (
    <View
      key={index}
      style={[
        styles.rendercontainer,
        {
          backgroundColor:
            item?.is_read == '1' ? colors.white : colors?.silver,
        },
      ]}>
      <Row style={{justifyContent: 'flex-start'}}>
        <View style={styles.titleandtextview}>
          <Row>
            <Bold color={colors.primary} label={item.notification_type} />
          </Row>
          <Regular color={colors.black} label={item.message} numberOfLines={100} />
        </View>
      </Row>
      {/* <Regular
        label={moment(item.created_at).format('DD MMM, YYYY  hh:mm a')}
        style={{alignSelf: 'flex-end'}}
        fontSize={mvs(12)}
        color={colors.primary}
      /> */}
    </View>
  );
  const itemSeparatorComponent = () => {
    return <View style={{paddingVertical: mvs(5)}}></View>;
  };
  return (
    <View style={styles.container}>
     <StatusBar
            translucent={false}
            backgroundColor={colors.primary}
            barStyle={'white'}
          />
      <Header1x2x title={t('Notifications')} />
      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          emptyList={<EmptyList label={t('No Notification')} />}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          data={notification}
          renderItem={renderAppointmentItem}
          ItemSeparatorComponent={itemSeparatorComponent()}
          keyExtractor={(_, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default Notifications;

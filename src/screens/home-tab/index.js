import * as IMG from 'assets/images';
import AppHeader from 'components/atoms/headers/index';
import ServiceCard from 'components/molecules/service-card';
import {colors} from 'config/colors';
import {useAppSelector} from 'hooks/use-store';
import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDashbaord, getNews} from 'services/api/auth-api-actions';
import {UTILS} from 'utils';
import styles from './styles';
import Medium from 'typography/medium-text';
import {mvs} from 'config/metrices';
import {Row} from 'components/atoms/row';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Regular from 'typography/regular-text';
import Bold from 'typography/bold-text';
import moment from 'moment';
import {PrimaryButton} from 'components/atoms/buttons';
import Bargraph from 'components/atoms/graph/bargraph';
import {HomeList, STORAGEKEYS} from 'config/constants';
import {navigate} from 'navigation/navigation-ref';
import CustomSwiper from 'components/atoms/swiper';
import {Text} from 'react-native';
import DrawerHomeCard from 'components/molecules/drawer-home-card';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomFlatList from 'components/atoms/custom-flatlist';
import CourseShiftButtonsCard from 'components/molecules/course-shift-button-card';
import {FlatList} from 'react-native';
import MyCarousel from 'components/molecules/carousal/mycarousal';
import {Dropdown} from 'react-native-element-dropdown';

const HomeTab = props => {
  const user = useAppSelector(s => s?.user?.userInfo);
  const configData = useAppSelector(s => s?.user?.configData);
  console.log("configData2 in home tab", configData);
  console.log('user in home tab', user);
  const [select, setSelect] = useState('checkin');
  const [timeToggle, setTimeToggle] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState('Physics');
  const [isFocus, setIsFocus] = useState(false);
  const [news, setNews] = useState([]);
  const [gettingNews, setGettingNews] = useState([]);
    //  const [configData, setConfigData] = useState(null);

  // useEffect(() => {
  //   const fetchConfigData = async () => {
  //     try {
  //       const storedData = await UTILS.getItem(STORAGEKEYS.configData);
  //       console.log('🔍 Raw configData from storage:', storedData);

  //       if (storedData) {
  //         const parsedData = typeof storedData === 'string' ? JSON.parse(storedData) : storedData;
  //         console.log('✅ Parsed configData:', parsedData);
  //         setConfigData(parsedData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching config data:', error);
  //     }
  //   };

  //   fetchConfigData();
  // }, []);

  // const [currentTime, setCurrentTime] = useState(new Date());
  const swiperRef = useRef(null);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const datshow = [
    {title: '2323'},
    {title: 'sdgds'},
    {title: '2323'},
    {title: 'sdgds'},
    {title: '2323'},
    {title: 'sdgds'},
  ];
  const [order, setOrder] = React.useState([]);
  const getNewses = async () => {
    try {
      setGettingNews(true);
      const res = await getNews();
      console.log('news response', res);
      setNews(res?.data || []);
    } catch (error) {
      console.log('news error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setGettingNews(false);
    }
  };
  React.useEffect(() => {
    getNewses();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array to run the effect only once

  const announcements = [
    {
      id: 1,
      type: 'Announcement',
      title: 'Announcement 1',
      description: 'Details about announcement 1',
    },
    {
      id: 2,
      type: 'Announcement',
      title: 'Announcement 2',
      description: 'Details about announcement 2',
    },
    {
      id: 1,
      type: 'Event',
      title: 'Event 1',
      description: 'Details about event 1',
    },
  ];
  const registeredCourses = [
    {
      id: 1,
      title: 'Web Development',
    },
    {
      id: 2,
      title: 'Data Science',
    },
    {
      id: 3,
      title: 'Artificial Intelligence',
    },
  ];
  const myData = [
    {
      title: 'Announcement 1',
      description: 'This is the first item of the crosal.',
    },
    {
      title: 'Announcement 2',
      description: 'Here some info about the second one',
    },
    {
      title: 'Announcement 3',
      description: 'And this is the third item in the carousel.',
    },
  ];
  const renderItem = ({item}) => (
    <CourseShiftButtonsCard
      item={item}
      onPress={() => {
        handlePress(item?.id);
      }} // Toggle expansion on press
    />
  );
  const onPressed = () => {
    const toggle = !isDisabled;
    console.log('pressed', toggle);
    setIsDisabled(toggle);
  };
  const courses = [
    {label: 'Mathematics', value: 'math'},
    {label: 'Physics', value: 'physics'},
    {label: 'Chemistry', value: 'chem'},
    {label: 'Biology', value: 'bio'},
    {label: 'Computer Science', value: 'cs'},
  ];
  return (
    <View style={styles.container}>
<StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'white'}
      />
      <View style={{backgroundColor: colors.primary}}>
        <Row
          style={{
            alignItems: 'center',
            backgroundColor: colors.primary,
            marginHorizontal: mvs(10),
            marginVertical: mvs(15),
          }}>
          <Bold label={`${configData?.business_name}  LMS`} style={styles.title} numberOfLines={2} />
          <TouchableOpacity onPress={() => navigate('Notifications')}>
            <Image
              style={{
                width: mvs(25),
                height: mvs(25),
                borderRadius: mvs(35),
              }}
              source={IMG.notification}
            />
          </TouchableOpacity>
        </Row>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMG.homebackgroundimg}
          resizeMode="stretch"
          style={styles.backgroundimg}>
          {/* <AppHeader
          title={'Prismatic LMS'}
          style={{backgroundColor: colors.primary,marginTop:mvs(-15)}}
        /> */}
        </ImageBackground>

        <View style={{marginTop: mvs(-130), padding: mvs(20)}}>
          <View style={styles.infoContainer}>
            <Row>
              <View style={{flex: 1}}>
                <Bold
                  label={`Welcome Back to ${configData?.related_type ==  '1' ? 'Training' : 'College'}`}
                  numberOfLines={2}
                  color={colors.primary}
                  fontSize={mvs(16)}
                  style={{maxWidth: '85%'}}
                />
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular color={colors.placeholder} label={'Name:'} />
                  </View>
                  <View style={{flex: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={user?.name || ''}
                      numberOfLines={2}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular color={colors.placeholder} label={'Mobile:'} />
                  </View>
                  <View style={{flexGrow: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={user?.mobile || ''}
                      numberOfLines={3}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular
                      numberOfLines={3}
                      fontSize={mvs(12)}
                      color={colors.placeholder}
                      label={`${configData?.related_type ==  '1' ? 'Batch' : 'Session'}:`}
                    />
                  </View>
                  <View style={{flexGrow: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={user?.batch || ''}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '35%'}}>
                    <Regular
                      numberOfLines={3}
                      fontSize={mvs(12)}
                      color={colors.placeholder}
                      label={'Branch:'}
                    />
                  </View>
                  <View style={{flexGrow: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={user?.branch || ''}
                    />
                  </View>
                </Row>
              </View>
              <Image
                source={
                  user?.profile_img
                    ? {uri: user?.profile_img}
                    : IMG.lmsavatar
                }
                 style={{
                  width: mvs(70),
                  height: mvs(70),
                  borderRadius: mvs(35),
                  marginRight: mvs(-15),
                  marginTop: mvs(-15),
                }}
                resizeMode="contain"
              />
              {
                console.log('user profile image', user?.profile_img)
              }
            </Row>
          </View>
        </View>
        {/* <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1,backgroundColor:colors.white,marginHorizontal:mvs(20)}}> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: mvs(6),
            // height: mvs(150),
          }}>
          <MyCarousel data={news} gettingNews={gettingNews} />
        </View>

        {/* <View style={styles.dropdowncontainer}>
          <View style={styles.dropdownWrapper}>
            <Medium
              style={[styles.label, (isFocus || value) && styles.labelFocused,{
    color: colors.primary,
              }]}
              label={'Shift Course'}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: '#007AFF'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              data={courses}
              maxHeight={mvs(300)}
              labelField="label"
              valueField="value"
              value={value}
              placeholder={!isFocus ? value : '...'}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                Alert.alert(
                  'Are you sure?',
                  `You selected: ${item.label}`,
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        setValue(item.value);
                        setIsFocus(false);
                      },
                    },
                  ],
                  {cancelable: true},
                );
              }}
            />
          </View>
        </View> */}

        {/* <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: mvs(20),
            marginBottom: mvs(120),
            marginHorizontal: mvs(20),
          }}>
          {HomeList.map((item, index) => {
            return (
              <ServiceCard
                onPress={() => {
                  console.log('move to :', item?.moveTo),
                    navigate(item?.moveTo);
                }}
                key={item?.id || index}
                backgroundColor={
                  index % 4 === 0 || index % 4 === 3
                    ? colors.homecard2
                    : colors.homecard1
                }
                item={item}
              />
            );
          })}
        </View> */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: mvs(20),
            marginBottom: mvs(120),
            marginHorizontal: mvs(20),
          }}>
          {HomeList.map((item, index) => {
            const isRegisterCourse = item.title === 'Register Course';

            return (
              <ServiceCard
                key={index}
                onPress={() => {
                  if (!isDisabled || isRegisterCourse) {
                    // console.log('move to :', item?.moveTo);
                    navigate(item?.moveTo);
                  }
                }}
                backgroundColor={
                  isDisabled
                    ? isRegisterCourse
                      ? colors.homecard1 // Register Course keeps its original color
                      : '#EBEBE4' // Other buttons are disabled
                    : isRegisterCourse
                    ? colors.homecard1 // Register Course is disabled when isDisabled is false
                    : index % 4 === 0 || index % 4 === 3
                    ? colors.homecard2
                    : colors.homecard1
                }
                disabled={isDisabled && !isRegisterCourse}
                item={item}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeTab;

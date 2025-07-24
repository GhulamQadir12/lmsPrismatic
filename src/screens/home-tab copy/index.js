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
  TouchableOpacity,
  View,
} from 'react-native';
import {getDashbaord} from 'services/api/auth-api-actions';
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

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once
  return (
    <Row style={styles.timeContainer}>
      <Fontisto name="clock" size={25} color={colors.black} />
      <Medium
        color={colors.primary}
        fontSize={mvs(18)}
        label={currentTime.toLocaleTimeString()}
      />
    </Row>
  );
};

const HomeTab = props => {
  const user = useAppSelector(s => s?.user);
  const [select, setSelect] = useState('checkin');
  const [timeToggle, setTimeToggle] = useState(true);
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
  const getList = async () => {
    try {
      setLoading(true);
      const res = await getDashbaord();
      setDashboardDetails(res?.data || []);
    } catch (error) {
      console.log('dashboard and homebanners get error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  // React.useEffect(() => {
  //   getList();
  // }, []);

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


  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMG.homebackgroundimg}
        resizeMode="stretch"
        style={styles.backgroundimg}>
        <AppHeader
          title={'Prismatic LMS'}
          style={{backgroundColor: colors.primary}}
        />
        <View style={{paddingHorizontal: mvs(20),marginTop:mvs(10),backgroundColor:colors.green}}>
          {/* <View style={styles.infoContainer}>
            <Row>
              <View style={{flex: 1}}>
                <Bold
                  label={'Welcome Back'}
                  color={colors.primary}
                  fontSize={mvs(18)}
                />
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(5)}}>
                  <View style={{width: '30%'}}>
                    <Regular color={colors.placeholder} label={'Name:'} />
                  </View>
                  <View style={{flex: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={'Muhammad Waqas'}
                      numberOfLines={2}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '30%'}}>
                    <Regular color={colors.placeholder} label={'CNIC:'} />
                  </View>
                  <View style={{flex: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={'35401-2645987-6'}
                      numberOfLines={2}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '30%'}}>
                    <Regular color={colors.placeholder} label={'Batch:'} />
                  </View>
                  <View style={{flexGrow: 1}}>
                    <Medium
                      fontSize={mvs(14)}
                      color={colors.primary}
                      label={'Batch 1'}
                      numberOfLines={3}
                    />
                  </View>
                </Row>
                <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
                  <View style={{width: '30%'}}>
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
                      label={'Lahore'}
                    />
                  </View>
                </Row>
               
              </View>
              
            </Row>
           
          </View> */}

          {/* <View style={{marginTop: mvs(10),backgroundColor:colors.primary}}> */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{height:'100%',flexGrow: 1,backgroundColor:colors.yellow}}>
              <View
                style={{
                  height: 100,
                  paddingHorizontal: mvs(5),
                  marginVertical: mvs(10),
                  borderRadius: mvs(10),
                  backgroundColor: colors.silver,
                }}>
                <CustomSwiper
                  autoplay={false}
                  ref={swiperRef}
                  showsPagination
                  onIndexChanged={index =>
                    console.log(`Current Slide: ${index}`)
                  }>
                  {announcements.map(slide => (
                    <View key={slide.id} style={styles.slide}>
                      <Row
                        style={{
                          // backgroundColor: 'pink',
                          width: '100%',
                          justifyContent: 'flex-start',
                          gap: mvs(30),
                        }}>
                        <Text style={styles.title}>{slide.title}</Text>
                        {slide.type == 'Announcement' ? (
                          <Icon name="megaphone" size={25} color="#000" />
                        ) : (
                          <MaterialIcons name="event" size={25} color="#000" />
                        )}
                      </Row>
                      <Text style={styles.description}>
                        {slide.description}
                      </Text>
                    </View>
                  ))}
                </CustomSwiper>
              </View>



              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginTop: mvs(20),
                  marginBottom: mvs(120),
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
              </View>
              <View style={{height: mvs(0)}}>
                <Medium color={colors.white}>1</Medium>
              </View>
            </ScrollView>
          {/* </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};
export default HomeTab;

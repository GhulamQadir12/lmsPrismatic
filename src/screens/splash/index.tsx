import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as IMG from 'assets/images';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import React, {useEffect} from 'react';
import {Image, ImageBackground, StatusBar, View} from 'react-native';
import i18n from 'translation';
import {UTILS} from 'utils';
import {STORAGEKEYS} from '../../config/constants';
import {
  setConfigData,
  setLanguage,
  setLocation,
  setUserInfo,
} from '../../store/reducers/user-reducer';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import {Loader} from 'components/atoms/loader';
import {useIsFocused} from '@react-navigation/native';
import {getConfigData} from 'services/api/auth-api-actions';
import { colors, setDynamicColors } from 'config/colors';
import { setBaseUrls } from 'services/api/api-urls';
// import {AppDispatch, RootState} from 'store';


type props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

// const Splash = (props: props) => {
//   const { navigation } = props;
//   const dispatch = useAppDispatch();

//   React.useEffect(() => { }, []);
//   React.useEffect(() => {
//     (async () => {
//       try {
//         let screen: any = 'Onboarding';
//         UTILS.get_current_location(
//           position => {
//             dispatch(
//               setLocation({
//                 latitude: position?.coords?.latitude,
//                 longitude: position?.coords?.longitude,
//               }),
//             );
//           },
//           error => { },
//         );
//         UTILS.getItem(STORAGEKEYS.lang).then((lang: any) => {
//           i18n.changeLanguage(lang);
//           dispatch(setLanguage(lang ?? 'en'));
//         });

// UTILS.getItem(STORAGEKEYS.user).then((data: any) => {
//   if (data) {
//     const user = JSON.parse(data);
//     screen = 'Onboarding';
//     dispatch(setUserInfo(user));
//   } else {
//     screen = 'Drawer'
//   }

//           setTimeout(() => {
//             navigation?.replace(screen);
//           }, 2000);
//         });
//       } catch (error) { }
//     })();
//   }, []);

const Splash = (props: props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(true);
  const [logoUrl, setLogoUrl] = React.useState('');
  const [configData, setConfigData2] = React.useState<any>(null);

  const isFocused = useIsFocused();

  const fetchConfigData = async () => {
    try {
      setLoading(true);
      const response = await getConfigData();
      
      if (response?.success && response?.data) {
        setConfigData2(response?.data);
        setDynamicColors(response?.data?.primary_color, response?.data?.secondary_color);
        setBaseUrls(`${response?.data?.lms_url}/api/`, `${response?.data?.website_url}`);
        
        // Store the data properly
        await UTILS.setItem(STORAGEKEYS.configData, JSON.stringify(response?.data));
        dispatch(setConfigData(response?.data)); // Removed because setConfigData is not an action creator
        
        const logoFullPath = `https://ace.prismaticcrm.com/assets/img/prof/${response?.data?.logo}`;
        setLogoUrl(logoFullPath);
      }
    } catch (err) {
      console.error('Failed to fetch data', err);
      // Fallback to stored data if API fails
      const storedData = await UTILS.getItem(STORAGEKEYS.configData);
      if (storedData) {
        const parsedData = typeof storedData === 'string' ? JSON.parse(storedData) : storedData;
        setConfigData2(parsedData);
        setDynamicColors(parsedData?.primary_color, parsedData?.secondary_color);
        setBaseUrls(`${parsedData?.lms_url}/api/`, `${parsedData?.website_url}`);
        const logoFullPath = `https://ace.prismaticcrm.com/assets/img/prof/${parsedData?.logo}`;
        setLogoUrl(logoFullPath);
      }
    } finally {
      setLoading(false);
      navigationfunc();
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchConfigData();
    }
  }, [isFocused]);

  const navigationfunc = async () => {
    try {
        const data1 = await UTILS.getItem(STORAGEKEYS.configData);
    console.log('🔍 Raw configData from storage:', data1);
    const isAppLaunched = await UTILS.getItem('hasLaunched');

    if (data1) {
      const configData = typeof data1 === 'string' ? JSON.parse(data1) : data1;
      console.log('✅ Parsed configData:', configData);
      // Check if we have valid config data (either from API or storage)
      const screen = configData ? 'Login' : 'Login'; // You might want different logic here
    }
    if (isAppLaunched) {
        navigation?.replace('Login');
      } else {
        setTimeout(() => {
          navigation?.replace('Onboarding');
        }, 2000);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // navigation?.replace('Login'); // Fallback screen
      navigation?.replace('Onboarding'); // Fallback screen
    }
  };
  // }, []);

  return (
    <View style={{...styles.container}}>
       <StatusBar
              translucent={false}
              backgroundColor={colors.white}
              barStyle={'white'}
            />
      {loading ? (
        <Loader />
      ) : (
        // <ImageBackground
        //   source={IMG.splashbackgroundimg}
        //   resizeMode="cover"
        //   style={{width: '100%', height: '100%'}}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: colors.white,
              // marginTop: '87%',
            }}>
            <Image
              source={{
                uri: `${logoUrl}`,
              }}
              // source={IMG.appiconimg}
              resizeMode={'contain'}
              style={{width: mvs(215), height: mvs(168)}}
            />
          </View>
        // </ImageBackground>
      )}
    </View>
  );
};
export default Splash;

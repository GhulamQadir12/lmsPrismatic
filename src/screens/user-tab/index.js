import * as IMG from 'assets/images';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import showToast from 'components/atoms/show-toast';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {Formik} from 'formik';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import React from 'react';
import {ImageBackground, StatusBar, TouchableOpacity, View} from 'react-native';
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

const UserTab = props => {
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

  const intrestedList = [
    {id: 1, name: 'Social Marketing'},
    {id: 2, name: 'SEO '},
    {id: 3, name: 'Programming'},
  ];

  return (
    <View style={styles.container}>
     <StatusBar
            translucent={false}
            backgroundColor={colors.primary}
            barStyle={'white'}
          />
      <Header1x2x back={true} title={'Profile'} />

      <View
        style={{
          width: '100%',
          marginBottom: mvs(20),
          height: mvs(150),
        }}>
        <Image
          source={userInfo?.profile_img ? {uri: userInfo?.profile_img} : IMG.lmsavatar}
          style={styles.imgUpload}
          resizeMode='contain' />

        <Medium
          color={colors.primary}
          label={userInfo?.name || ''}
          style={styles.name}
          numberOfLines={3}
        />
      </View>
      <View style={styles.infoContainer}>
        <Row>
          <View style={{flex: 1}}>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Email :'}
                  numberOfLines={3}
                />
              </View>
              <View style={{width: '65%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.email || ''}
                  numberOfLines={3}
                />
              </View>
            </Row>
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Mobile:' || 'N/A'}
                  numberOfLines={3}
                />
              </View>
              <View style={{width: '65%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.mobile || 'N/A'}
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
                  label={'Whatsapp :'}
                />
              </View>
              <View style={{width: '65%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.whatsapp || 'N/A'}
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
                  label={'Status :'}
                />
              </View>
              <View style={{width: '65%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.status || 'N/A'}
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
                  label={'Branch :'}
                />
              </View>
              <View style={{flexGrow: 1}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.branch || 'N/A'}
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
                  label={'Enrolled :'}
                />
              </View>
              <View style={{width: '65%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.selected_degree || 'N/A'}
                  numberOfLines={3}
                />
              </View>
            </Row>
            {/* <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Enrolled :'}
                />
              </View>
              <View style={{flexGrow: 1}}>
                {intrestedList.map(item => (
                  <Medium
                    key={item.id}
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={'• ' + item.name}
                  />
                ))}
              </View>
            </Row> */}
            <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Batch :'}
                />
              </View>
              <View style={{width: '65%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={userInfo?.batch || 'N/A'}
                  numberOfLines={3}
                />
              </View>
            </Row>
          </View>
        </Row>
      </View>
    </View>
  );
};
export default UserTab;

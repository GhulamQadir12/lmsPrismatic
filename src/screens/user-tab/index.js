import * as IMG from 'assets/images';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppSelector} from 'hooks/use-store';
import React from 'react';
import {StatusBar, View} from 'react-native';
import Medium from 'typography/medium-text';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Regular from 'typography/regular-text';
import {Image} from 'react-native';

const UserTab = props => {
  const user = useAppSelector(s => s?.user);
  const userInfo = user?.userInfo;

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
        <View
          style={{
            width: mvs(125),
            height: mvs(125),
            alignSelf: 'center',
            borderWidth: mvs(1),
            borderColor: colors.border,
            borderRadius: mvs(100),
            marginTop: mvs(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              userInfo?.profile_img
                ? {uri: userInfo?.profile_img}
                : IMG.lmsavatar
            }
            style={styles.imgUpload}
            resizeMode="contain"
          />
        </View>

        <Medium
          color={colors.primary}
          label={userInfo?.name || 'N/A'}
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
                  label={userInfo?.email || 'N/A'}
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

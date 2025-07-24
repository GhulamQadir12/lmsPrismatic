import {mvs} from 'config/metrices';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {Checkbox} from 'components/atoms/checkbox';
import {PrimaryButton} from 'components/atoms/buttons';
import RNFetchBlob from 'rn-fetch-blob';
import {Image} from 'react-native';
import * as IMG from 'assets/images';



const HelpSupportCard = ({item}) => {


  return (
    <View style={styles.infoContainer}>
      <Row>
        <View style={{flex: 1}}>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Id :'}
              />
            </View>
            <View style={{flex: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.id || 'N/A'}
                numberOfLines={3}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Name :'}
              />
            </View>
            <View style={{flex: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.contact_name || 'N/A'}
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
                label={'Email :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.contact_email || 'N/A'}
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
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.contact_subject || 'N/A'}
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
            <View style={{width: '65%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={moment(item?.lec_date).format('YYYY-MM-DD') || 'N/A'}
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
                label={item?.status || 'N/A'}
                numberOfLines={13}
              />
            </View>
          </Row>
        
        </View>
      </Row>
    </View>
  );
};

export default HelpSupportCard;

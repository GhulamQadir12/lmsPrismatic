import {mvs} from 'config/metrices';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Feather from 'react-native-vector-icons/Feather';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {Checkbox} from 'components/atoms/checkbox';
import {PrimaryButton} from 'components/atoms/buttons';
import QuizInstructionsModal from '../modals/quiz-modal';
import {useNavigation} from '@react-navigation/native';

const DailyPannerCard = ({item}) => {
  const navigation = useNavigation();

 const dateTimeString = item?.created_at;
  const dateOnly = moment(dateTimeString).format("YYYY-MM-DD");
  const startDateString = item?.start_date;
  const dateOnly2 = moment(dateTimeString).format("YYYY-MM-DD");
  const endDateString = item?.end_date;
  const dateOnly3 = moment(dateTimeString).format("YYYY-MM-DD");
  console.log(dateOnly); // Output: 2025-07-08




  return (
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
                    label={item?.program_name || 'N/A'}
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
                    label={item?.faculty_name || 'N/A'}
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
                    label={'Start/End Time:'}
                  />
                </View>
                <View style={{flexGrow: 1, maxWidth: '60%'}}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={`${item?.start_time} / ${item?.end_time}` || 'N/A'}
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
                    label={item?.status || 'N/A'}
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
                    label={item?.roomID || 'N/A'}
                    numberOfLines={3}
                  />
                </View>
              </Row>
            </View>
          </Row>
    </View>
  );
};

export default DailyPannerCard;

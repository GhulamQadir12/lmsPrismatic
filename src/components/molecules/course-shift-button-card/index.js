import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import { PrimaryButton } from 'components/atoms/buttons';

const CourseShiftButtonsCard = ({item, style,onPress, onPressNavigate, isExpanded}) => {
  // console.log("items:",item)
  // console.log("items:",item.ReimbursementId)
  return (
    // <View style={styles.container}>
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Regular label={item?.title} color={colors.white}/>
    </TouchableOpacity>
  
  );
};

export default CourseShiftButtonsCard;

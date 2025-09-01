import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DailyPannerCard = ({item, isExpanded,questionNumber, onToggle}) => {
  const navigation = useNavigation();

  const dateTimeString = item?.created_at;
  const dateOnly = moment(dateTimeString).format('YYYY-MM-DD');

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'conducted':
        return colors.green; // Green
      case 'pending':
      case 'upcoming':
        return colors.yellow; // Yellow
      case 'cancelled':
      case 'missed':
        return colors.red; // Red
      default:
        return colors.primary; // Default color
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onToggle}
      style={styles.container}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.dateBadge,{
              backgroundColor: colors.primary,
        }]}>
          <Medium
            fontSize={mvs(12)}
            color={colors.white}
            label={questionNumber || 0}
            style={styles.dayNumber}
          />
        
        </View>
        
        <View style={styles.headerContent}>
          <Medium
            fontSize={mvs(16)}
            color={colors.cyan}
            label={item?.program_name || 'No Subject'}
            numberOfLines={1}
            style={styles.subjectTitle}
          />
          <Medium
            fontSize={mvs(12)}
            color={colors.cyan}
            label={`${item?.start_time} - ${item?.end_time}`}
          />
        </View>
        
        <View style={styles.headerRight}>
          <View style={[styles.statusBadge, {backgroundColor: getStatusColor(item?.status)}]}>
            <Medium
              fontSize={mvs(10)}
              color={colors.white}
              label={item?.status || 'N/A'}
              style={styles.statusText}
            />
          </View>
          <Icon 
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={mvs(24)} 
            color={colors.primary} 
          />
        </View>
      </View>

      {isExpanded && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="event" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Date:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={dateOnly || 'N/A'}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="menu-book" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Subject:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.program_name || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="person" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Instructor:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.faculty_name || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="schedule" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Time:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={`${item?.start_time} - ${item?.end_time}`}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="meeting-room" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Room:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.roomID || 'N/A'}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="info" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Status:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={getStatusColor(item?.status)}
              label={item?.status || 'N/A'}
              style={[styles.valueText, {fontWeight: '500'}]}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default DailyPannerCard;
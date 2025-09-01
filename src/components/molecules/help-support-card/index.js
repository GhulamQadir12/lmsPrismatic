import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Medium from 'typography/medium-text';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpSupportCard = ({item, numberId, isExpanded, onToggle}) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
      case 'completed':
        return colors.green; // Green
      case 'in progress':
      case 'pending':
        return colors.yellow; // Yellow
      case 'open':
      case 'new':
        return colors.bluecolor; // Blue
      case 'closed':
      case 'cancelled':
        return colors.red; // Red
      default:
        return colors.primary; // Default color
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD MMM YYYY');
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onToggle}
      style={styles.container}
    >
      <View style={styles.cardHeader}>
        <View style={styles.ticketNumber}>
          <Medium
            fontSize={mvs(16)}
            color={colors.white}
            label={`${numberId}`}
          />
        </View>
        
        <View style={styles.headerContent}>
          <Medium
            fontSize={mvs(16)}
            color={colors.primary}
            label={item?.contact_other_subject || 'N/A'}
            numberOfLines={1}
            style={styles.ticketTitle}
          />
          <Medium
            fontSize={mvs(12)}
            color={colors.cyan}
            label={formatDate(item?.created_at)}
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
              <Icon name="person" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Name:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.contact_name || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="email" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Email:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.contact_email || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="subject" size={mvs(16)} color={colors.placeholder} />
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
              label={item?.contact_other_subject || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

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
              label={formatDate(item?.created_at)}
              style={styles.valueText}
            />
          </View>
          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="event" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Message:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.contact_message}
              style={styles.valueText}
              numberOfLines={3}
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

export default HelpSupportCard;
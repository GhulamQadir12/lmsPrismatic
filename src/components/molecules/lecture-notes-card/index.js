import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Medium from 'typography/medium-text';
import {downloadFile, getFileExtension, renderFileIcon} from 'utils';
import {URLS} from 'services/api/api-urls';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LectureNotesCard = ({item, questionNumber, isExpanded, onToggle}) => {
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const handleDownload = async () => {
  const fileUrl = `${URLS.docs.download_lectures}${item?.file_upload}`;
  const fileName = item?.file_upload || 'lecture_notes.pdf';
  downloadFile(fileUrl, fileName, {
    notificationTitle: 'Downloading lecture notes',
    onSuccess: path => setDownloadLoading(false),
      onBeforeDownload: () => setDownloadLoading(true),
    onError: error => {
      // don’t use console.error
      setDownloadLoading(false);
      Alert.alert(
        'Download failed',
        error?.message || 'Something went wrong while downloading.'
      );
    },
  });
};


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    // Assuming date is in DD-MMM-YYYY format
    return dateString;
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onToggle}
      style={styles.container}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.lectureNumber,
    {backgroundColor: colors.primary}
        ]}>
          <Medium
            fontSize={mvs(16)}
            color={colors.white}
            label={`${questionNumber}`}
          />
        </View>
        
        <View style={styles.headerContent}>
          <Medium
            fontSize={mvs(16)}
            color={colors.primary}
            label={item?.lec_title || 'Untitled Lecture'}
            numberOfLines={1}
            style={styles.lectureTitle}
          />
          <Medium
            fontSize={mvs(12)}
            color={colors.lightGray}
            label={formatDate(item?.lec_date)}
          />
        </View>
        
        <Icon 
          name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
          size={mvs(24)} 
          color={colors.primary} 
        />
      </View>

      {isExpanded && (
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="description" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Lecture:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.lec_title || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="school" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Faculty:'}
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
              label={item?.subject_name || 'N/A'}
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
              label={formatDate(item?.lec_date)}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="attachment" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'File:'}
                style={styles.labelText}
              />
            </View>
            <TouchableOpacity
            disabled={!item?.file_upload || downloadLoading}
              onPress={handleDownload}
              style={styles.fileContainer}>
              {renderFileIcon(
                getFileExtension(item?.file_upload || ''),
                mvs(20),
                colors.primary,
              )}
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                 label={
                  downloadLoading
                    ? 'Downloading...'
                    : item?.file_upload || 'No file available'
                }
                numberOfLines={2}
                style={styles.fileText}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LectureNotesCard;
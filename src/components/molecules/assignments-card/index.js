import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {PrimaryButton} from 'components/atoms/buttons';
import {navigate} from 'navigation/navigation-ref';
import {downloadFile, getFileExtension, renderFileIcon} from 'utils';
import {URLS} from 'services/api/api-urls';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AssignmentsCard = ({item, questionNumber, role, isExpanded, onToggle}) => {
    const [downloadLoading, setDownloadLoading] = React.useState(false);
    const [qfDownloadLoading, setQfDownloadLoading] = React.useState(false);
    console.log("doen",downloadLoading)

  const handleSubmittedFileDownload = async () => {
    if (!item?.submitted_file_url) return;
    const fileName = item.submitted_file_url.split('/').pop() || 'submitted_assignment.pdf';
    const fileUrl = item.submitted_file_url;
    downloadFile(fileUrl, fileName, {
      notificationTitle: 'Downloading submitted assignment',
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

  const handleDownload = async () => {
    if (!item?.assignment_img) return;
    const fileName = item.assignment_img || 'assignment.pdf';
    const fileUrl = `${URLS.docs.download_assignment}${fileName}`;
    downloadFile(fileUrl, fileName, {
      notificationTitle: 'Downloading assignment',
       onSuccess: path => setQfDownloadLoading(false),
      onError: error => setQfDownloadLoading(false),
      onBeforeDownload: () => setQfDownloadLoading(true),
    });
  };

  const getStatusInfo = () => {
    if (item?.is_submitted) {
      return { color: colors.green, text: 'Submitted' };
    } else if (moment(item?.submission_date, 'DD-MMM-YYYY').isBefore(moment(), 'day')) {
      return { color: colors.red, text: 'Missing' };
    } else {
      return { color: colors.yellow, text: 'Pending' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onToggle}
      style={styles.container}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.assignmentNumber,{
    backgroundColor: colors.primary,
        }]}>
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
            label={item?.add_title || 'Untitled Assignment'}
            numberOfLines={1}
            style={styles.assignmentTitle}
          />
          <Medium
            fontSize={mvs(12)}
            color={colors.cyan}
            label={`Due: ${item?.submission_date}`}
          />
        </View>
        
        <View style={styles.headerRight}>
          <View style={[styles.statusBadge, {backgroundColor: statusInfo.color}]}>
            <Medium
              fontSize={mvs(10)}
              color={colors.white}
              label={statusInfo?.text}
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
              <Icon name="event" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Due Date:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.submission_date || 'N/A'}
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
              <Icon name="description" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Question File:'}
                style={styles.labelText}
              />
            </View>
            <TouchableOpacity 
              onPress={handleDownload}
              style={styles.fileContainer}
              disabled={!item?.assignment_img || qfDownloadLoading}
            >
              {renderFileIcon(
                getFileExtension(item?.assignment_img),
                mvs(20),
                colors.primary,
              )}
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                // label={item?.assignment_img || 'N/A'}
                  label={
                  qfDownloadLoading
                    ? 'Downloading...'
                    : item?.assignment_img || 'No file attached'
                }
                numberOfLines={2}
                style={styles.fileText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="file-upload" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Submitted File :'}
                style={styles.labelText}
                numberOfLines={2}
              />
            </View>
            {item?.is_submitted ? (
              <TouchableOpacity 
              disabled={!item?.submitted_file_url || downloadLoading}
                onPress={handleSubmittedFileDownload}
                style={styles.fileContainer}
              >
                {renderFileIcon(
                  getFileExtension(item?.submitted_file_url),
                  mvs(20),
                  colors.primary,
                )}
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={
                  downloadLoading
                    ? 'Downloading...'
                    : item?.submitted_file_url?.split('/').pop() || 'No file attached'
                }
                  numberOfLines={2}
                  style={styles.fileText}
                />
              </TouchableOpacity>
            ) : (
              <Medium
                fontSize={mvs(14)}
                color={colors.cyan}
                label="Not submitted yet"
                style={styles.valueText}
              />
            )}
          </View>

          {role === 'student' && (
            <View style={styles.buttonContainer}>
              {!item?.is_submitted ? (
                moment(item?.submission_date, 'DD-MMM-YYYY').isSameOrAfter(moment(), 'day') ? (
                  <PrimaryButton
                    title="Upload Assignment"
                    containerStyle={styles.uploadButton}
                    onPress={() => navigate('AssignmentSubmission', {item})}
                  />
                ) : null
              ) : moment(item?.submission_date, 'DD-MMM-YYYY').isSameOrAfter(moment(), 'day') ? (
                <PrimaryButton
                  title="Update Submission"
                  containerStyle={styles.updateButton}
                  onPress={() => navigate('AssignmentSubmission', {item})}
                />
              ) : (
                <PrimaryButton
                  title="Submitted"
                  disabled={true}
                  containerStyle={[styles.submittedButton,{
                        backgroundColor: colors.primary
                  }]}
                />
              )}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AssignmentsCard;
import {mvs} from 'config/metrices';
import React, { useEffect } from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {Checkbox} from 'components/atoms/checkbox';
import {PrimaryButton} from 'components/atoms/buttons';
import RNFetchBlob from 'rn-fetch-blob';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {navigate} from 'navigation/navigation-ref';
import { disallowScreenshot } from 'react-native-screen-capture';

const AssignmentsCard = ({item}) => {
  const handleDownload = async () => {
    const {fs, config} = RNFetchBlob;
    const {DownloadDir} = fs.dirs;

    const fileName = item?.assignment_img || 'assignment.pdf';
    const fileUrl = `https://ace.prismaticcrm.com/upload/assignments/${fileName}`;
    const destPath = `${DownloadDir}/${fileName}`;

    try {
      // Check if file already exists
      const exists = await fs.exists(destPath);

      if (exists) {
        // Ask user to re-download
        Alert.alert(
          'File Already Downloaded',
          'This file already exists. Do you want to re-download it?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Re-Download',
              onPress: () => downloadFile(fileUrl, destPath),
            },
          ],
        );
      } else {
        // File doesn't exist, proceed to download
        downloadFile(fileUrl, destPath);
      }
    } catch (err) {
      console.error('Error checking file existence:', err);
    }
  };

  const downloadFile = (url, path) => {
    const {config} = RNFetchBlob;

    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: 'Downloading file...',
      },
    })
      .fetch('GET', url)
      .then(res => {
        console.log('File downloaded to:', res.path());
        Alert.alert('Download complete!');
      })
      .catch(error => {
        console.error('Download failed:', error);
        Alert.alert('Download failed!');
      });
  };

  const fileExtension = item.assignment_img?.split('.').pop().toLowerCase();

  const renderFileIcon = () => {
    if (fileExtension === 'pdf') {
      return (
        <FontAwesome name="file-pdf-o" size={mvs(20)} color={colors.red} />
      );
    } else if (
      ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(fileExtension)
    ) {
      return (
        <FontAwesome
          name="file-word-o" // You can choose different icons if needed: file-powerpoint-o, file-excel-o
          size={mvs(20)}
          color={colors.red} // or a color like '#2B579A'
        />
      );
    } else {
      return null; // Or a default icon if needed
    }
  };

  const dateTimeString = item?.created_at;

  const dateOnly = moment(dateTimeString).format('YYYY-MM-DD');

  console.log(dateOnly); // Output: 2025-07-08
  useEffect(() => {
    console.log('Disabling screenshots...');
    disallowScreenshot(true);
    return () => {
      console.log('Re-enabling screenshots...');
      disallowScreenshot(false);
    };
  }, []);

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
                numberOfLines={3}
              />
            </View>
            <View style={{flex: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.id || ''}
                numberOfLines={3}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Assignment Title :'}
                numberOfLines={3}
              />
            </View>
            <View style={{flex: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.add_title || ''}
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
                label={'Faculty :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.faculty_name || ''}
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
                label={'Submission Date :'}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.submission_date || ''}
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
                label={item?.program_name || ''}
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
                label={'Question File :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Row
                style={{
                  justifyContent: 'flex-start',
                  gap: mvs(10),
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={handleDownload}>
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.red}
                    label={item?.assignment_img || ''}
                    style={{textDecorationLine: 'underline'}}
                    numberOfLines={3}
                  />
                </TouchableOpacity>
                {renderFileIcon()}
              </Row>
            </View>
          </Row>

          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Submitted File :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Row
                style={{
                  justifyContent: 'flex-start',
                  gap: mvs(10),
                  alignItems: 'center',
                }}>
                {item?.is_submitted ? (
                  <>
                    <TouchableOpacity onPress={handleDownload}>
                      <Medium
                        fontSize={mvs(14)}
                        color={colors.red}
                        label={
                          item?.submitted_file_url?.split('/').pop() ||
                          'No file found'
                        }
                        style={{textDecorationLine: 'underline'}}
                        numberOfLines={3}
                      />
                    </TouchableOpacity>
                    {renderFileIcon()}
                  </>
                ) : moment(item?.submission_date, 'DD-MMM-YYYY').isBefore(
                    moment(),
                    'day',
                  ) ? (
                  <Medium
                    fontSize={mvs(14)}
                    color={colors.red}
                    label={'Missing'}
                  />
                ) : null}
              </Row>
            </View>
          </Row>

          <Row>
            <View></View>
            {!item?.is_submitted ? (
              moment(item?.submission_date, 'DD-MMM-YYYY').isSameOrAfter(
                moment(),
                'day',
              ) ? (
              <PrimaryButton
                title="Upload"
                containerStyle={{
                  width: '30%',
                  borderRadius: mvs(5),
                  backgroundColor: colors.green,
                  marginTop: mvs(10),
                }}
                onPress={() => navigate('AssignmentSubmission', {item})}
              />
              ) : null
            ) : moment(item?.submission_date, 'DD-MMM-YYYY').isSameOrAfter(
                moment(),
                'day',
              ) ? (
              <PrimaryButton
                title="Update"
                containerStyle={{
                  width: '30%',
                  borderRadius: mvs(5),
                  backgroundColor: colors.red,
                  marginTop: mvs(10),
                }}
                onPress={() => navigate('AssignmentSubmission', {item})}
              />
            ) : (
              <PrimaryButton
                title="Submitted"
                disabled={true}
                containerStyle={{
                  width: '30%',
                  borderRadius: mvs(5),
                  backgroundColor: colors.primary,
                  marginTop: mvs(10),
                }}
              />
            )}
          </Row>
        </View>
      </Row>
    </View>
  );
};

export default AssignmentsCard;

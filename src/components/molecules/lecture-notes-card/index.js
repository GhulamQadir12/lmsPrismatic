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



const LectureNotesCard = ({item}) => {
  console.log('first item', item);

  const handleDownload = async () => {
    const {fs, config} = RNFetchBlob;
    const {DownloadDir} = fs.dirs;

    const fileUrl = `https://ace.prismaticcrm.com/upload/LecturesDocs/${item?.file_upload}`;
    const fileName = item?.file_upload || 'lecture_notes.pdf'; // Default file name if not provided
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

  //   const handleDownload = async () => {
  //   const { config, fs } = RNFetchBlob;
  //   const { DownloadDir } = fs.dirs; // Downloads directory (Android)

  //   const fileUrl = `https://ace.prismaticcrm.com/upload/LecturesDocs/${item?.file_upload}`;
  //   const fileName = item?.file_upload || 'lecture_notes.pdf'; // Default file name if not provided
  //   const destPath = `${DownloadDir}/${fileName}`;

  //   config({
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path: destPath,
  //       description: 'Downloading file...',
  //     },
  //   })
  //     .fetch('GET', fileUrl)
  //     .then((res) => {
  //       console.log('File downloaded to:', res.path());
  //       alert('Download complete!');
  //     })
  //     .catch((error) => {
  //       console.error('Download failed:', error);
  //       alert('Download failed!');
  //     });
  // };

const fileExtension = item.file_upload?.split('.').pop().toLowerCase();

const renderFileIcon = () => {
  if (fileExtension === 'pdf') {
    return (
      <FontAwesome
        name="file-pdf-o"
        size={mvs(20)}
        color={colors.red}
      />
    );
  } else if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(fileExtension)) {
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
                label={'Lecture :'}
              />
            </View>
            <View style={{flex: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.lec_title || ''}
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
                label={'Subject :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.subject_name || ''}
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
                  label={'Batch :'}
                />
              </View>
              <View style={{flexGrow: 1,maxWidth:'60%'}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={'Batch: 33'}
                  numberOfLines={3}
                />
              </View>
            </Row> */}
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Date :'}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.lec_date || ''}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Uploaded file :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
              <Row style={{justifyContent: 'flex-start',gap:mvs(10),alignItems:'center'}}>
                <TouchableOpacity onPress={handleDownload}>
                  <Medium
                    fontSize={mvs(16)}
                    color={colors.red}
                    label={item?.file_upload || ''}
                    style={{textDecorationLine: 'underline'}}
                    numberOfLines={3}
                  />
                </TouchableOpacity>
                {renderFileIcon()}
          
              </Row>
            </View>
          </Row>
        </View>
      </Row>
    </View>
  );
};

export default LectureNotesCard;

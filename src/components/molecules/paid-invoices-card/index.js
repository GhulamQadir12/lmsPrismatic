import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View, Alert} from 'react-native';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from 'hooks/use-store';

const PaidInvoicesCard = ({item}) => {
  console.log('Received item:', item);
  const configData = useAppSelector(s => s?.user?.configData);

  const handleDownload = async () => {
    const {fs} = RNFetchBlob;
    const {DownloadDir} = fs.dirs;

    const fileUrl = item?.file_url;
    if (!fileUrl) {
      Alert.alert('File Not Found', 'No file URL is available.');
      return;
    }

    const fileName = fileUrl.split('/').pop();
    const destPath = `${DownloadDir}/${fileName}`;

    try {
      const exists = await fs.exists(destPath);

      if (exists) {
        Alert.alert(
          'File Already Downloaded',
          'This file already exists. Do you want to re-download it?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Re-Download',
              onPress: () => downloadFile(fileUrl, destPath),
            },
          ],
        );
      } else {
        downloadFile(fileUrl, destPath);
      }
    } catch (err) {
      console.error('Error checking file existence:', err);
      Alert.alert('Error', 'Something went wrong while checking file.');
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
        description: 'Downloading receipt...',
      },
    })
      .fetch('GET', url)
      .then(res => {
        console.log('File downloaded to:', res.path());
        Alert.alert('Download Complete', `File saved to: ${res.path()}`);
      })
      .catch(error => {
        console.error('Download failed:', error);
        Alert.alert('Download Failed', 'Could not download the file.');
      });
  };

  const dateOnly = moment(item?.created_at).format('YYYY-MM-DD');

  return (
    <View style={styles.infoContainer}>
      <TouchableOpacity
        style={styles.documentContainer}
        onPress={handleDownload}>
        {/* <Row style={{ justifyContent: 'center', gap:mvs(15) }}>
    <FontAwesome
            name="file-pdf-o"
            size={mvs(20)}
            color={colors.red}
          />
      <View>
        <Medium label={item?.receipt_id} fontSize={16} color={colors.primary} style={{textDecorationLine:'underline'}} />
      </View>
      </Row> */}
      </TouchableOpacity>
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
            <View style={{flex: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.id || 'N/A'}
                numberOfLines={2}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Branch :'}
              />
            </View>
            <View style={{flex: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.division_name || 'N/A'}
                numberOfLines={2}
              />
            </View>
          </Row>

          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={`${
                  configData?.related_type == '1' ? 'Batch' : 'Session'
                }:`}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.batch_name || 'N/A'}
              />
            </View>
          </Row>

          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Courses :'}
              />
            </View>
            <View style={{width: '65%'}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.program_name || 'N/A'}
                numberOfLines={100}
              />
            </View>
          </Row>

          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Invoice :'}
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
                    label={item?.receipt_id || ''}
                    style={{textDecorationLine: 'underline'}}
                    numberOfLines={3}
                  />
                </TouchableOpacity>
                <FontAwesome
                  name="file-pdf-o"
                  size={mvs(20)}
                  color={colors.red}
                />
              </Row>
            </View>
          </Row>
        </View>
      </Row>
    </View>
  );
};

export default PaidInvoicesCard;

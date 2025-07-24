import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
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
import { PrimaryButton } from 'components/atoms/buttons';
import RNFetchBlob from 'rn-fetch-blob';


const TobeVerifiedInvoicesCard = ({item}) => { 
  console.log('first item', item);


  const handleDownload = async () => {
  const { config, fs } = RNFetchBlob;
  const { DownloadDir } = fs.dirs; // Downloads directory (Android)

  const fileUrl = `https://ace.prismaticcrm.com/upload/assignments/${item?.assignment_img}`;
  const fileName = item?.assignment_img || 'assignment.pdf'; // Default file name if not provided
  const destPath = `${DownloadDir}/${fileName}`;

  config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: destPath,
      description: 'Downloading file...',
    },
  })
    .fetch('GET', fileUrl)
    .then((res) => {
      console.log('File downloaded to:', res.path());
      alert('Download complete!');
    })
    .catch((error) => {
      console.error('Download failed:', error);
      alert('Download failed!');
    });
};

const dateTimeString = item?.created_at;

const dateOnly = moment(dateTimeString).format("YYYY-MM-DD");

console.log(dateOnly); // Output: 2025-07-08

  return (
       <View style={styles.infoContainer}>
      <TouchableOpacity style={styles.documentContainer}>
        <Medium label={item?.receipt_id} fontSize={16} color={colors.primary} />
      </TouchableOpacity>
        <Row>
          <View style={{flex: 1}}>
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
                  label={'Batch :'}
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
              <View style={{flexGrow: 1}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={item?.program_name || 'N/A'}
                />
              </View>
            </Row>
            {/* <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Courses :'}
                />
              </View>
              <View style={{flexGrow: 1}}>
                {intrestedList.map(item => (
                  <Medium
                    key={item.id}
                    fontSize={mvs(14)}
                    color={colors.primary}
                    label={'• ' + item.name}
                  />
                ))}
              </View>
            </Row> */}
          
          </View>
        </Row>
      </View>
  
  );
};

export default TobeVerifiedInvoicesCard;

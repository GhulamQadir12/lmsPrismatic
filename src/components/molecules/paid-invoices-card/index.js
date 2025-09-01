import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import Medium from 'typography/medium-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {useAppSelector} from 'hooks/use-store';
import {downloadFile, getFileExtension, renderFileIcon} from 'utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';

const PaidInvoicesCard = ({item, invoiceNumber, isExpanded, onToggle}) => {
  const configData = useAppSelector(s => s?.user?.configData);
    const [downloadLoading, setDownloadLoading] = React.useState(false);

  const handleDownload = async () => {
    const fileName = item?.file_url?.split('/').pop() || 'invoice.pdf';
    downloadFile(item?.file_url, fileName, {
      notificationTitle: 'Downloading Invoice',
      notificationDescription: 'Your invoice is being downloaded',
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

  const formatAmount = (amount) => {
    if (!amount) return 'N/A';
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onToggle}
      style={styles.container}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.invoiceNumber,{
    backgroundColor: colors.primary
        }]}>
          <Medium
            fontSize={mvs(16)}
            color={colors.white}
            label={`${invoiceNumber}`}
          />
        </View>
        
        <View style={styles.headerContent}>
          <Medium
            fontSize={mvs(16)}
            color={colors.primary}
            label={item?.receipt_id || 'Invoice'}
            numberOfLines={1}
            style={styles.invoiceTitle}
          />
          <Medium
            fontSize={mvs(12)}
            color={colors.cyan}
            label={item?.division_name || 'N/A'}
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
              <Icon name="business" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Branch:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.division_name || 'N/A'}
              numberOfLines={2}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="class" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={`${configData?.related_type == '1' ? 'Batch' : 'Session'}:`}
                style={styles.labelText}
                numberOfLines={2}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.batch_name || 'N/A'}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="menu-book" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Courses:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.program_name || 'N/A'}
              numberOfLines={3}
              style={styles.valueText}
            />
          </View>

          {item?.amount && (
            <View style={styles.detailRow}>
              <View style={styles.labelContainer}>
                <Icon name="attach-money" size={mvs(16)} color={colors.placeholder} />
                <Regular
                  fontSize={mvs(13)}
                  color={colors.placeholder}
                  label={'Amount:'}
                  style={styles.labelText}
                />
              </View>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={formatAmount(item?.amount)}
                style={[styles.valueText]}
              />
            </View>
          )}

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="receipt" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Invoice:'}
                style={styles.labelText}
              />
            </View>
            <TouchableOpacity 
              onPress={handleDownload}
              style={styles.fileContainer}
              // disabled={!item?.file_url || downloadLoading}
            >
              {renderFileIcon(
                getFileExtension(item?.file_url),
                mvs(20),
                colors.primary,
              )}
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={
                  downloadLoading
                    ? 'Downloading...'
                    : item?.receipt_id || 'No file attached'
                }
                  numberOfLines={2}
                style={styles.fileText}
              />
            </TouchableOpacity>
          </View>

          {item?.payment_date && (
            <View style={styles.detailRow}>
              <View style={styles.labelContainer}>
                <Icon name="event" size={mvs(16)} color={colors.placeholder} />
                <Regular
                  fontSize={mvs(13)}
                  color={colors.placeholder}
                  label={'Payment Date:'}
                  style={styles.labelText}
                />
              </View>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.payment_date}
                style={styles.valueText}
              />
            </View>
          )}

          {item?.payment_method && (
            <View style={styles.detailRow}>
              <View style={styles.labelContainer}>
                <Icon name="payment" size={mvs(16)} color={colors.placeholder} />
                <Regular
                  fontSize={mvs(13)}
                  color={colors.placeholder}
                  label={'Payment Method:'}
                  style={styles.labelText}
                  numberOfLines={2}
                />
              </View>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.payment_method}
                style={styles.valueText}
                numberOfLines={2}
              />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PaidInvoicesCard;
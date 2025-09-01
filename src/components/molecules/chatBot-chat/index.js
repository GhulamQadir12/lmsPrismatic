import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import {Image} from 'react-native';
import * as IMG from 'assets/images';
import Regular from 'typography/regular-text';
import {useAppSelector} from 'hooks/use-store';
import { Loader } from 'components/atoms/loader';

const Item = ({item,isLoading}) => {
  const user = useAppSelector(s => s?.user?.userInfo);
// console.log('item', item);
  return (
    <View style={{marginHorizontal: mvs(20)}}>
      {/* User Message (always shown if exists) */}
      {item.text && (
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble2}>
            <Regular style={styles.messageText2} label={item.text} numberOfLines={1000}/>
          </View>
          <View style={styles.picContainer}>
            <Image
              source={user?.profile_img ? {uri: user?.profile_img} : IMG.lmsavatar}
              style={styles.image1}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
      
      {/* Bot Response (shown only when answer exists) */}
      <View style={styles.messageContainer1}>
        <View style={styles.picContainer}>
          <Image source={IMG.prisChatBotLogo} style={styles.image2} />
        </View>
        <View style={styles.messageBubble2}>
           {isLoading && !item.answer ? (
            <Loader />
          ) : (
            <Regular style={styles.messageText} label={item.answer || ''} numberOfLines={1000}/>
          )}
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  messageContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: mvs(10),
    flexDirection: 'row',
    gap: mvs(10),
  },
  messageContainer1: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: mvs(10),
    flexDirection: 'row',
    gap: mvs(10),
  },
  messageBubble2: {
    backgroundColor: '#0078fe',
    padding: mvs(10),
    borderRadius: mvs(10),
    maxWidth: '70%',
    minWidth: '25%',
    borderWidth: mvs(1),
    borderColor: colors.border,
    backgroundColor: colors.white,
    // alignSelf: 'flex-end',
    marginBottom: mvs(10),
    minHeight: mvs(40),
    marginTop: mvs(5),
  },
  messageText: {
    color: colors.black,
    fontSize: mvs(12),
    textAlign: 'left',
  },
  messageText2: {
    color: colors.black,
    fontSize: mvs(12),
    textAlign: 'left',
  },
  image2: {
    width: mvs(38),
    height: mvs(38),
    marginRight: mvs(1),
  },
  image1: {
    width: mvs(38),
    height: mvs(38),
  },
  picContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: mvs(43),
    height: mvs(43),
    borderRadius: mvs(50),
    borderWidth: mvs(1),
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
});

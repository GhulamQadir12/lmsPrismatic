import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {mvs} from 'config/metrices';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import * as IMG from 'assets/images';
import { Image } from 'react-native';


const ChatListCard = ({item, onPress}) => {
  const formatDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY h:mm A');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
    <Row>
     <View style={styles.picContainer}>
               <Image source={IMG.prisChatBotLogo} style={styles.image2} />
             </View>
      <View style={{width: '78%'}}>
        <Bold 
          style={styles.title} 
          label={item.title || 'Untitled Conversation'} 
          numberOfLines={1}
        />
        <Regular 
          style={styles.previewText} 
          label={`${item.conversation[0]?.text || ''}...`} 
          numberOfLines={1}
        />
        <Regular 
          style={styles.dateText} 
          label={formatDate(item.updated_at || item.created_at)} 
        />
      </View>
        </Row>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(8),
    paddingVertical: mvs(6),
    paddingHorizontal: mvs(8),
    marginBottom: mvs(8),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: mvs(16),
    color: colors.primary,
    marginBottom: mvs(0),
  },
  dateText: {
    fontSize: mvs(12),
    marginBottom: mvs(0),
    alignSelf: 'flex-end',
  },
  previewText: {
    fontSize: mvs(14),
    color: colors.black,
  },
     image2: {
      width: mvs(38),
      height: mvs(38),
      marginLeft: mvs(2),
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

export default ChatListCard;
import {CrossModal} from 'assets/icons';
import {PrimaryButton} from 'components/atoms/buttons';
import {Loader} from 'components/atoms/loader';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import moment from 'moment';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

const AnnouncementDescriptionModal = ({
  loading,
  style = {},
  visible = false,
  onClose = () => {},
  onStartQuiz = () => {},
  instructions = {
    questionCount: 0,
    attempts: '',
    timing: '',
    answers: '',
    pageReload: '',
  },
}) => {
  console.log('instructions', instructions);
  const [dateOnly,setDateOnly] = React.useState(''); 
React.useEffect(() => {
  if (instructions?.created_at) {
    const onlyDate = moment(instructions?.created_at).format("YYYY-MM-DD");
    setDateOnly(onlyDate);
  }
}, [instructions?.created_at]); // runs only when created_at changes

  return (
    <ModalWrapper
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header} />
          {/* <Row style={{alignItems: 'center', justifyContent: 'space-between'}}> */}
          <View style={{marginTop:mvs(10)}}>
            {/* <TouchableOpacity onPress={onClose} style={styles.cross}>
              <Entypo name="cross" size={mvs(25)} color={colors.red} />
            </TouchableOpacity> */}
            <Bold
              label={'Announcement'}
              style={[
                styles.heading,
                {color: colors.primary, textAlign: 'center'},
              ]}
              numberOfLines={2}
            />
          </View>
          {/* </Row> */}
          <View style={styles.instructionsContainer}>
            <InstructionItem
              title={instructions?.title || 'N/A'}
              description={instructions?.description || 'N/A'}
              date={dateOnly || 'N/A'}
            />
          </View>
          <PrimaryButton
            title="Close"
            onPress={onClose}
            containerStyle={{
              borderRadius: mvs(8),
              backgroundColor: colors.lightsilver,
              width:'70%',
              alignSelf:'center'
            }}
            textStyle={{color: colors.black}}
          />
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

const InstructionItem = ({title, description,date}) => (
  <View style={styles.instructionItem}>
    <Medium
      label={`${title}:` || 'N/A'}
      style={[
        styles.instructionTitle,
        {color: colors.black, textAlign: 'center'},
      ]}
      numberOfLines={6}
      fontSize={mvs(16)}
    />
    <Regular label={`(${date})` || ''} style={{alignSelf:'flex-end'}} />
    <Medium
      label={`${description || 'N/A'}`}
      style={[styles.instructionDescription, {textAlign: 'center'}]}
      numberOfLines={134}
      fontSize={mvs(14)}
      color={colors.cyan}
    />
  </View>
);

export default AnnouncementDescriptionModal;

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '95%',
    backgroundColor: colors.transparent,
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    // paddingVertical: mvs(25),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(20),
    maxHeight: '85%',
    minHeight: '35%',
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(10),

  },
  cross: {
    padding: mvs(0),
    borderWidth: mvs(3),
    borderColor: colors.red,
    borderRadius: mvs(50),
    width: mvs(30),
    height: mvs(30),
    alignSelf: 'flex-end',
    // marginBottom:mvs(5)
  },
  heading: {
    fontSize: mvs(20),
    // textAlign: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
    // marginBottom: mvs(10),
  },
  instructionsContainer: {
    marginBottom: mvs(20),
    marginTop: mvs(10),
  },
  instructionItem: {
    marginBottom: mvs(15),
    flexGrow: 1,
    gap: mvs(5),
  },
  instructionTitle: {
    fontWeight: 'bold',
    marginBottom: mvs(5),
  },
  instructionDescription: {
    color: colors.black,
    lineHeight: mvs(20),
  },
  startButton: {
    borderRadius: mvs(10),
    paddingVertical: mvs(15),
    alignItems: 'center',
    marginBottom: mvs(10),
  },
  buttonText: {
    color: colors.white,
    fontSize: mvs(16),
    fontWeight: 'bold',
  },
});

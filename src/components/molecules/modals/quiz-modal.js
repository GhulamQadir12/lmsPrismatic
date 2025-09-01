import {CrossModal} from 'assets/icons';
import {Loader} from 'components/atoms/loader';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Medium from 'typography/medium-text';
import Entypo from 'react-native-vector-icons/Entypo';

const QuizInstructionsModal = ({
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
          {/* <View style={styles.header} /> */}
           <TouchableOpacity onPress={onClose} style={styles.cross}>
                       {/* <CrossModal /> */}
                       <Entypo name="circle-with-cross" size={25} color={colors.red} />
                     </TouchableOpacity>
          <Medium
            label={t('Quiz instructions')}
            style={[styles.heading, {color: colors.primary}]}
          />
          <View style={styles.instructionsContainer}>
            <InstructionItem
              title={t('Questions')}
              description={`This quiz consists of ${instructions?.questionCount} questions.`}
            />
            <InstructionItem
              title={t('Attempts')}
              description={instructions?.attempts}
            />
            <InstructionItem
              title={t('Timing')}
              description={instructions?.timing}
            />
            <InstructionItem
              title={t('Answers')}
              description={instructions?.answers}
            />
            <InstructionItem
              title={t('Page Reload Restrictions')}
              description={instructions?.pageReload}
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={onStartQuiz}
            style={[styles.startButton, {backgroundColor: colors.primary}]}>
            {loading ? (
              <Loader />
            ) : (
              <Medium label={t('Take The Quiz')} style={styles.buttonText} />
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ModalWrapper>
  );
};

const InstructionItem = ({title, description}) => (
  <View style={styles.instructionItem}>
    <Medium
      label={`${title}:` || 'N/A'}
      style={[styles.instructionTitle, {color: colors.primary}]}
      numberOfLines={4}
    />
    <Medium
      label={description || 'N/A'}
      style={styles.instructionDescription}
      numberOfLines={64}
    />
  </View>
);

export default QuizInstructionsModal;

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: mvs(20),
    borderRadius: mvs(20),
    maxHeight: '85%',
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  cross: {
    padding: mvs(5),
    alignSelf: 'flex-end',
    marginTop:mvs(20)

  },
  heading: {
    fontSize: mvs(20),
    textAlign: 'center',
    marginBottom: mvs(20),
  },
  instructionsContainer: {
    marginBottom: mvs(20),
  },
  instructionItem: {
    marginBottom: mvs(15),
    flexGrow: 1,
  },
  instructionTitle: {
    fontSize: mvs(16),
    fontWeight: 'bold',
    marginBottom: mvs(5),
  },
  instructionDescription: {
    fontSize: mvs(14),
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

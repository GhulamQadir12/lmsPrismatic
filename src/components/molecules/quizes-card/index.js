import {mvs} from 'config/metrices';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {PrimaryButton} from 'components/atoms/buttons';
import QuizInstructionsModal from '../modals/quiz-modal';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'hooks/use-store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QuizesCard = ({item, questionNumber, role, isExpanded, onToggle}) => {
  const navigation = useNavigation();
  const [showInstructions, setShowInstructions] = useState(false);
  const configData = useAppSelector(s => s?.user?.configData);

  const instructions = {
    questionCount: item?.question_count || 0,
    attempts: 'You will have only one attempt for this quiz.',
    timing: `You will need to complete your attempt in one sitting, as you are allotted ${
      item?.time || 'N/A'
    } minutes to complete it.`,
    answers:
      'You cannot review your answer-choices.To start, click the "Take the Quiz" button. When finished, click the "Finish" button. Only registered, enrolled users can take quizzes.',
    pageReload:
      'You are not allowed to reload the page while you are attempting a specific quiz. If you will go to refresh the page you will not be allowed to attempt it again as you have only one attempt.',
  };

  const handleStartQuiz = () => {
    navigation.navigate('QuizAttempt', {
      quizId: item?.id,
      isBounded: item?.time_allowed || null,
      boundTime: item?.bound_time || 0,
    });
    setShowInstructions(false);
  };

  const getQuizStatus = () => {
    if (item?.is_published == "1") {
      return { color: colors.green, text: 'Completed', icon: 'check-circle' };
    } else if (item?.attempted) {
      return { color: colors.bluecolor, text: 'Attempted', icon: 'history' };
    } else if (moment(item?.lastDate, 'DD-MMM-YYYY').isBefore(moment(), 'day')) {
      return { color: colors.red, text: 'Expired', icon: 'cancel' };
    } else {
      return { color: colors.yellow, text: 'Available', icon: 'access-time' };
    }
  };

  const statusInfo = getQuizStatus();

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={onToggle}
      style={styles.container}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.quizNumber,{
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
            label={item?.exam_title || 'Untitled Quiz'}
            numberOfLines={1}
            style={styles.quizTitle}
          />
          <Medium
            fontSize={mvs(12)}
            color={colors.cyan}
            label={`${item?.question_count} questions • ${item?.total_marks} marks`}
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
              label={item?.teacher_name || 'N/A'}
              numberOfLines={2}
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
              <Icon name="class" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={`${configData?.related_type == '1' ? 'Batch' : 'Session'}:`}
                style={styles.labelText}
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
              <Icon name="quiz" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Questions:'}
                style={styles.labelText}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.question_count || 'N/A'}
              style={styles.valueText}
            />
          </View>

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="star" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Total Marks:'}
                style={styles.labelText}
                numberOfLines={2}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.total_marks || 'N/A'}
              style={styles.valueText}
            />
          </View>

          {item?.is_published == "1" && (
            <View style={styles.detailRow}>
              <View style={styles.labelContainer}>
                <Icon name="grade" size={mvs(16)} color={colors.placeholder} />
                <Regular
                  fontSize={mvs(13)}
                  color={colors.placeholder}
                  label={'Obtained Marks:'}
                  numberOfLines={2}
                  style={styles.labelText}
                />
              </View>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.obtainedMarks || 0}
                style={styles.valueText}
              />
            </View>
          )}

          <View style={styles.detailRow}>
            <View style={styles.labelContainer}>
              <Icon name="event" size={mvs(16)} color={colors.placeholder} />
              <Regular
                fontSize={mvs(13)}
                color={colors.placeholder}
                label={'Last Date:'}
                style={styles.labelText}
                numberOfLines={2}
              />
            </View>
            <Medium
              fontSize={mvs(14)}
              color={colors.primary}
              label={item?.lastDate || 'N/A'}
              style={styles.valueText}
            />
          </View>

          <View style={styles.buttonContainer}>
            {!item?.attempted &&
            item?.exam_status == 'pending' &&
            moment(item?.lastDate, 'DD-MMM-YYYY').isSameOrAfter(moment(), 'day') ? (
              role === 'student' ? (
                <PrimaryButton
                  title="Start Quiz"
                  onPress={() => setShowInstructions(true)}
                  containerStyle={styles.startButton}
                  textStyle={styles.buttonText}
                />
              ) : null
            ) : item?.is_published == "1" ? (
              <PrimaryButton
                title="Review Quiz"
                onPress={() =>
                  navigation.navigate('QuizReview', {
                    quizId: item?.id,
                  })
                }
                containerStyle={styles.reviewButton}
                textStyle={styles.buttonText}
              />
            ) : null}
          </View>
        </View>
      )}

      <QuizInstructionsModal
        visible={showInstructions}
        onClose={() => setShowInstructions(false)}
        onStartQuiz={handleStartQuiz}
        instructions={instructions}
      />
    </TouchableOpacity>
  );
};

export default QuizesCard;
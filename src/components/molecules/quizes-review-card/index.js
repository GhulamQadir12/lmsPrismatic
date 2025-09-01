import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {colors} from 'config/colors';
import Feather from 'react-native-vector-icons/Feather';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {Checkbox} from 'components/atoms/checkbox';

const QuizeReviewCard = ({item, questionNumber}) => {
  const studentAnswered =
    item?.student_answer && item?.student_answer !== 'No Answered';

  return (
    <View style={styles.questionContainer}>
      <Bold
        label={`${questionNumber}- ${item?.question}` || 'N/A'}
        style={[styles.questionLabel, {color: colors.primary}]}
        numberOfLines={100}
      />

      <View style={styles.optionsContainer}>
        {item?.choices.map((option, index) => {
          const isStudentAnswer =
            studentAnswered && option === item?.student_answer;
          const isCorrectAnswer = option === item?.correct_answer;

          return (
            <TouchableOpacity
              key={`${item?.question_id}-${index}`}
              style={[
                styles.optionButton,
                isStudentAnswer && styles.selectedOption,
                isCorrectAnswer && {backgroundColor: colors.lightGreen}, // Highlight correct answer
              ]}
              activeOpacity={1} // Set to 1 to prevent any opacity change on press
            >
              <Checkbox
                checked={isStudentAnswer && option === item?.student_answer}
                onPress={() => {}} // Empty function since this is review mode
                color={isCorrectAnswer ? colors.green : colors.primary}
                disabled={true} // Disable checkbox interaction
              />
              <Medium
                label={option}
                numberOfLines={17}
                style={[
                  styles.optionText,
                  isStudentAnswer && {color: colors.black},
                  isCorrectAnswer && {color: colors.green}, // Make correct answer text green
                ]}
              />
              {isCorrectAnswer && (
                <Feather
                  name="check-circle"
                  size={20}
                  color={colors.green}
                  style={{marginLeft: 'auto'}}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {item?.feedback_message && (
        <View
          style={[
            styles.feedbackContainer,
            {
              backgroundColor:
                item?.answer_status === 'Correct'
                  ? colors.lightGreen
                  : colors.lightRed,
            },
          ]}>
          <Medium
            label={item?.feedback_message}
            style={{
              color:
                item?.answer_status === 'Correct' ? colors.green : colors.red,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default QuizeReviewCard;

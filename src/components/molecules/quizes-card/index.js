import {mvs} from 'config/metrices';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import Feather from 'react-native-vector-icons/Feather';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {Checkbox} from 'components/atoms/checkbox';
import {PrimaryButton} from 'components/atoms/buttons';
import QuizInstructionsModal from '../modals/quiz-modal';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'hooks/use-store';

const QuizesCard = ({item}) => {
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
    // Logic to start the quiz after instructions are shown

    // You can navigate to the quiz screen here
    // navigate('QuizAttempt');
    navigation.navigate('QuizAttempt', {
      quizId: item?.id,
      isBounded: item?.time_allowed || null,
      boundTime: item?.bound_time || 0,
    });
    setShowInstructions(false);
  };

  return (
    <View style={styles.infoContainer}>
      <Row>
        <View style={{flex: 1}}>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Id :'}
              />
            </View>
            <View style={{flexGrow: 1, maxWidth: '60%'}}>
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
                label={item?.teacher_name || ''}
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
                label={item?.program_name || ''}
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
                label={'Quiz Title :'}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.exam_title || ''}
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
                label={item?.batch_name || ''}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Total Questions:'}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.question_count || ''}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Total Marks :'}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.total_marks || ''}
              />
            </View>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
            <View style={{width: '35%'}}>
              <Regular
                numberOfLines={3}
                fontSize={mvs(15)}
                color={colors.placeholder}
                label={'Obtained Marks :'}
              />
            </View>
            <View style={{flexGrow: 1}}>
              <Medium
                fontSize={mvs(14)}
                color={colors.primary}
                label={item?.obtainedMarks || 0}
              />
            </View>
          </Row>

          {/* <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
              <View style={{width: '35%'}}>
                <Regular
                  numberOfLines={3}
                  fontSize={mvs(15)}
                  color={colors.placeholder}
                  label={'Last Date :'}
                />
              </View>
              <View style={{flexGrow: 1}}>
                <Medium
                  fontSize={mvs(14)}
                  color={colors.primary}
                  label={item?.lec_date || ''}
                />
              </View>
            </Row> */}
        </View>
      </Row>
      <Row>
        <View></View>
        {!item?.attempted &&
        moment(item?.lastDate, 'DD-MMM-YYYY').isSameOrAfter(moment(), 'day') ? (
          <TouchableOpacity
            style={{
              maxWidth: '30%',
              borderRadius: mvs(5),
              backgroundColor: colors.green,
            }}
            onPress={() => setShowInstructions(true)}>
            <Row
              style={{
                justifyContent: 'flex-start',
                gap: mvs(10),
                alignItems: 'center',
                padding: mvs(10),
              }}>
              <Regular
                fontSize={mvs(16)}
                color={colors.white}
                label={'Start'}
                style={{textAlign: 'center'}}
              />
              <Feather
                name="arrow-up-right"
                size={mvs(25)}
                color={colors.white}
              />
            </Row>
          </TouchableOpacity>
        ) : (
          <PrimaryButton
            title="Review Quiz"
            containerStyle={{
              maxWidth: '35%',
              borderRadius: mvs(5),
              backgroundColor: colors.primary,
            }}
            onPress={() =>
              navigation.navigate('QuizReview', {
                quizId: item?.id,
              })
            }
          />
        )}
      </Row>

      <QuizInstructionsModal
        visible={showInstructions}
        onClose={() => setShowInstructions(false)}
        onStartQuiz={handleStartQuiz}
        instructions={instructions}
      />
    </View>
  );
};

export default QuizesCard;

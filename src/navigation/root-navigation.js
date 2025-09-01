// In App.js in a new project
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from 'config/colors';
import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Attendance from 'screens/attendance';
import ForgotPasswordScreen from 'screens/forgot-password';
import HelpUs from 'screens/help-us';
import LanguageScreen from 'screens/language-screen';
import LoginScreen from 'screens/login-screen';
import Notifications from 'screens/notifications';
import ResetPasswordScreen from 'screens/reset-password';
import Splash from 'screens/splash';
import {horizontalAnimation} from '../utils';
import DrawerNavigation from './drawer-navigation/drawer-navigation';
import FeeInvoiceCategory from 'screens/fee-invoice-category';
import RegisterCourse from 'screens/register-course';
import ChatList from 'screens/chat-list';
import RegisterPasswordScreen from 'screens/register-password-screen';
import OtpScreen from 'screens/otp-screen';
import FeeInvoiceList from 'screens/fee-invoice-list';
import Lms from 'screens/lms';
import LectureNotes from 'screens/leacture-notes';
import VideoTutorials from 'screens/video-tutorials';
import Quiz from 'screens/quiz';
import Assignment from 'screens/assignment';
import DailyPlanner from 'screens/daily-planner';
import DailyPlannerDetail from 'screens/daily-planner-detail';
import Announcement from 'screens/announcement';
import UnpaidFeeInvoiceList from 'screens/unpaid-fee-invoice-list';
import AddPaidInvoices from 'screens/add-paid-invoices';
import UserTab from 'screens/user-tab';
import SignupScreen from 'screens/signup-screen';
import TobeVerifiedInvoiceList from 'screens/to-be-verified-invoice-list';
import HelpDesk from 'screens/help-desk';
import QuizAttempt from 'screens/quiz-attempt-screen';
import AssignmentSubmission from 'screens/assignment-submission-screen';
import AiChat from 'screens/ai-chat-screen';
import QuizReview from 'screens/quiz-review-screen';
import BotChat from 'screens/bot-chat';
import HelpSupportList from 'screens/help-support-list-screen';
import GetStartedScreen from 'screens/get-started-screen';
import Onboarding from 'screens/on-boarding';
const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.primary}} />
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'white'}
      />
      <Stack.Navigator
        // initialRouteName="Drawer"
        initialRouteName="Splash"
        // initialRouteName="Lms"
        screenOptions={horizontalAnimation}>
        <Stack.Group>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen
            name="RegisterPasswordScreen"
            component={RegisterPasswordScreen}
          />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />

          <Stack.Screen name="UserTab" component={UserTab} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen
            name="FeeInvoiceCategory"
            component={FeeInvoiceCategory}
          />
          <Stack.Screen name="RegisterCourse" component={RegisterCourse} />
          <Stack.Screen name="FeeInvoiceList" component={FeeInvoiceList} />
          <Stack.Screen
            name="UnpaidFeeInvoiceList"
            component={UnpaidFeeInvoiceList}
          />
          <Stack.Screen name="AddPaidInvoices" component={AddPaidInvoices} />
          <Stack.Screen
            name="TobeVerifiedInvoiceList"
            component={TobeVerifiedInvoiceList}
          />

          <Stack.Screen name="Lms" component={Lms} />
          <Stack.Screen name="LectureNotes" component={LectureNotes} />
          <Stack.Screen name="VideoTutorials" component={VideoTutorials} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="QuizReview" component={QuizReview} />
          <Stack.Screen name="QuizAttempt" component={QuizAttempt} />
          <Stack.Screen name="Assignment" component={Assignment} />
          <Stack.Screen
            name="AssignmentSubmission"
            component={AssignmentSubmission}
          />
          <Stack.Screen name="DailyPlanner" component={DailyPlanner} />
          <Stack.Screen
            name="DailyPlannerDetail"
            component={DailyPlannerDetail}
          />
          <Stack.Screen name="HelpDesk" component={HelpDesk} />
          <Stack.Screen name="HelpSupportList" component={HelpSupportList} />

          <Stack.Screen name="AiChat" component={AiChat} />
          <Stack.Screen name="Announcement" component={Announcement} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="BotChat" component={BotChat} />
        </Stack.Group>

        <Stack.Group></Stack.Group>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="HelpUs" component={HelpUs} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

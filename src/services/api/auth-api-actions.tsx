import {AppDispatch, RootState} from 'store';
import {
  getAuthorizedData,
  getData,
  postAuthorizedData,
  postData,
  postDataParams,
  postFormData,
  putData,
} from './';
import {IP, URLS} from './api-urls';
import {UTILS} from 'utils';
import {STORAGEKEYS} from 'config/constants';
import {Alert} from 'react-native';
import {
  resetUser,
  setCountries,
  setNotifications,
  setRole,
  setUserInfo,
} from './../../store/reducers/user-reducer';
import {goBack, resetStack} from 'navigation/navigation-ref';
export const getUserInfo = () => {
  return getData(URLS.auth.get_user_info);
};
import axios from 'axios';
import showToast from 'components/atoms/show-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLetterTypes = async (values: any) => {
  try {
    const url = `${URLS.letter_types_base_url}${URLS.auth.letter_types}`;
    console.log('url of letters types', url);
    const res = await getData(url);
    console.log('res of Get letter types=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getEmployeesLetterDetail = async (values: any) => {
  try {
    const url = `${URLS.emp_letters_base_url}${URLS.auth.emp_letters_detail}${values}`;
    console.log('url of employee letters detail', url);
    const res = await getData(url);
    console.log('res of Get employee letter detail=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getEmployeesLetterList = async (values: any) => {
  try {
    const url = `${URLS.emp_letters_base_url}${URLS.auth.emp_letters}${values}`;
    console.log('url of employee letters list', url);
    const res = await getData(url);
    console.log('res of Get employee letter list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getStrikeLetterDetail = async (values: any) => {
  try {
    const url = `${URLS.strike_letter_base_url}${URLS.auth.strike_letter_details}${values}`;
    console.log('url of strike letter detail', url);
    const res = await getData(url);
    console.log('res of Get strike letter detail=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};

export const getStrikeLetterList = async (values: any) => {
  try {
    const url = `${URLS.strike_letter_base_url}${URLS.auth.strike_letter}${values}`;
    console.log('url of strike letter list', url);
    const res = await getData(url);
    console.log('res of Get strike letter list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getOvertimeList = async (values: any) => {
  try {
    const url = `${URLS.overtime_base_url}${URLS.auth.overtime_list}?userName=${values}`;
    console.log('url of overtime list', url);
    const res = await getData(url);
    // console.log("res of Get employees list=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getEmployeesList = async (values: any) => {
  try {
    const url = `${URLS.complaint_base_url}${URLS.auth.total_employees}`;
    console.log('url of employees list', url);
    const res = await getData(url);
    // console.log("res of Get employees list=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getDepartmentList = async (values: any) => {
  try {
    const url = `${URLS.designation_base_url}${URLS.auth.designation_list}`;
    console.log('url of department list', url);
    const res = await getData(url);
    // console.log("res of Get department list=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getComplainList = async (values: any) => {
  try {
    const url = `${URLS.complaint_base_url}${URLS.auth.complaint_list}?employeeID=${values}`;
    console.log('url of complaint list', url);
    const res = await getData(url);
    console.log('res of Get complaint list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getWorkFromHomeCategory = async (values: any) => {
  try {
    const url = `${URLS.wfh_base_url}${URLS.auth.wfh_category}`;
    console.log('url of WFH category', url);
    const res = await getData(url);
    console.log('res of Get WFH category=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getWorkFromHomeList = async (values: any) => {
  try {
    const url = `${URLS.wfh_base_url}${URLS.auth.wfh_list}?userName=${values}`;
    console.log('url of WFH list', url);
    const res = await getData(url);
    console.log('res of Get WFH list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getAdvanceList = async (values: any) => {
  try {
    const url = `${URLS.advance_base_url}${URLS.auth.advance_list}?employeeID=${values}`;
    console.log('url of advance list', url);
    const res = await getData(url);
    console.log('res of Get advance list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getLoanList = async (values: any) => {
  try {
    const url = `${URLS.loan_base_url}${URLS.auth.loan_list}?employeeID=${values}`;
    console.log('url of loan list', url);
    const res = await getData(url);
    console.log('res of Get loan list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getLeaveTypes = async (values: any) => {
  try {
    const url = `${IP}${URLS.auth.leavetype_list}`;
    const res = await getData(url);
    console.log('res of Get leave type=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getLeaveList = async (values: any) => {
  try {
    const url = `${URLS.leave_base_url}${URLS.auth.leave_list}?userName=${values}`;
    const res = await getData(url);
    console.log('res of Get leave list=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getReimbursementList = async (values: any) => {
  try {
    const url = `${URLS.base_url}${URLS.auth.reinbursement}?userName=${values}`;
    const res = await getData(url);
    // console.log("res of getReimbursementList=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    // Alert.alert('Error', UTILS.returnError(error));
    // showToast({
    //   type: 'error',
    //   text1: 'Error',
    //   text2: UTILS.returnError(error),
    // });
  }
};
export const getReinbursementType = async () => {
  try {
    const url = `${URLS.base_url}${URLS.auth.reinbursementType}`;
    // console.log("getReinbursementType url=>", url);
    const res = await getData(url);
    // console.log("res of getReinbursementType=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getFinancialYear = async (values: any) => {
  try {
    const url = `${URLS.base_url}${URLS.auth.financialYear}?_companyID=${values}`;
    // console.log("url of getFinancialYear=>", url);
    const res = await getData(url);
    // console.log("res of getfinancialYear=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getRequestId = async (values: any) => {
  try {
    const url = `${URLS.base_url}${URLS.auth.requestId}?fmonth=${values.month}&finyear=${values.year}`;
    // console.log("url of getRequestId=>", url);
    const res = await getData(url);
    // console.log("res of getRequestId=>", res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getReimbursementDetails = async (values: any) => {
  try {
    const url = `${URLS.base_url}${URLS.auth.reimbursementDetails}?GroupId=${values.groupId}&CompanyId=${values.companyId}&ReimbursementId=${values.reimbursementId}`;
    console.log('url of getDetails=>', url);
    const res = await getData(url);
    console.log('res of getReimbursementDetails=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};

export const onLogin2 = async (
  values: any,
  setLoading: (loading: boolean) => void,
  isBack: boolean,
) => {
  try {
    setLoading(true); // Set loading state to true

    // Construct the URL correctly
    const url = `${URLS.main_url}${URLS.auth.login}`; // Ensure no double slashes
    console.log('Login URL:', url);

    // Format data for x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append('username', values.username);
    formData.append('password', values.password);
    formData.append('grant_type', 'password'); // Ensure 'password' is correct
    formData.append('auth_type', 'webuser'); // Ensure 'webuser' is correct

    // Convert formData to a query string
    const formDataString = formData.toString();
    console.log('Encoded Form Data (URL):', formDataString);

    // Call postDataParams to send the request
    const response = await postDataParams(url, formDataString);
    console.log('response:', response);
    // await UTILS.setItem(STORAGEKEYS.token, response);
    await UTILS.setItem(STORAGEKEYS.token, response?.access_token);

    console.log('access_token:', await UTILS.getItem(STORAGEKEYS.token));
    return response; // Return response data
  } catch (error: any) {
    // Log and handle error properly
    const errorMessage = error?.response?.data || error.message;
    console.error('Error in onLogin2:', errorMessage);

    throw error; // Re-throw the error to let the calling function handle it
  } finally {
    setLoading(false); // Set loading state to false when the process is finished
  }
};

// export const onLogin = (
//   values: any,
//   setLoading: (bool: boolean) => void,
//   isBack: boolean,
//   params?: any // Optional parameter to pass additional params
// ) => {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     try {
//       setLoading(true);
//       console.log("first values + uri",`${URLS.main_url}${URLS.auth.login}`+ values);
//       // Send login request with additional params if provided
//       const res = await postDataParams(`${URLS.main_url}${URLS.auth.login}`, values);
//       console.log('res of onLogin=>', res);

//       // Save token in local storage
//       // await UTILS.setItem(STORAGEKEYS.token, res?.access_token);

//       // Optionally handle user info or other data
//       // await UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));

//       // Reset the navigation stack and navigate
//       resetStack('Drawer');
//       console.log("login res", res);
//       return res;

//     } catch (error: any) {
//       console.log('error in login', UTILS.returnError(error));
//       Alert.alert('', UTILS.returnError(error));
//       // Handle errors, show toast messages, etc.
//     } finally {
//       setLoading(false);
//     }
//   };
// };
export const getHelpSupportList = async (page = 1) => {
  try {
    // const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.helpSupport.get_helpSupport}?page=${page}`;
    const res = await getData(url);
    console.log('res of Get getHelpSupportList=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const postHelpSupport = async (values:any) => {
  try {
    console.log('Submitting help Suuport:', values);
    return await postData(`${URLS.helpSupport.post_helpSupport}`, values);
  } catch (error: any) {
    console.error('Error submitting helpSuuport:', error);
    const res = UTILS.returnError(error);
    Alert.alert('Submission Error', UTILS.returnError(error));
    throw error; // Re-throw the error to handle it in the calling function
  }
};
export const submitQuiz = async (values: {
  answers: Array<{
    question_id: number;
    std_answer: string;
  }>;
},id:any) => {
  try {
    console.log('Submitting quiz with values:', values);
    return await postData(`${URLS.lms.submitQuiz}${id}`, values);
  } catch (error: any) {
    console.error('Error submitting quiz:', error);
    const res = UTILS.returnError(error);
    Alert.alert('Submission Error', UTILS.returnError(error));
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getNews = async (values:any) => {
  try {
    // const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.newsData.get_news}`;
    const res = await getData(url);
    console.log('res of Get news=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getquizReview = async (page = 1,id:any) => {
  try {
    // const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.quizReview}${id}?page=${page}`;
    const res = await getData(url);
    console.log('res of Get quiz review=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getQuizQuestions = async (values:any) => {
  try {
    // const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.startQuiz}${values}`;
    const res = await getData(url);
    console.log('res of Get quiz questions=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getConfigData = async () => {
  try {
    // const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.config.config_data}`;
    const res = await getData(url);
    console.log('res of Get config data=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getNotifications = async (values:any) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.notification.send_notification}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get notification=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getDailyPlanner = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.daily_planner.planner_list}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get daily planner=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getToBeVerifiedInvoices = async (values:any) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.fee_invoice_category.to_be_verified}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get to be verified invoices=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getUnPaidInvoices = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.fee_invoice_category.unpaid_invoices}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get Unpaid invoices=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getFeesPaid = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.fee_invoice_category.paid_invoices}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get paid fees=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getLectureNotesPdf = async (values:any) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.lecture_pdf}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get lecture pdf=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getQuizes = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.quizzes}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get quizes=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};

// export const getLectures = async (page = 1) => {
//   try {
//     const token = await AsyncStorage.getItem(STORAGEKEYS.token);
//     const url = `${URLS.lms.lectures}?page=${page}`;
//     const res = await getAuthorizedData(url, token || undefined);
//     return res;
//   } catch (error) {
//     console.log('error', UTILS.returnError(error));
//   }
// };

export const getAssignments = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.assignments}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get assignments=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getVideoTutorials = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.videoTutorials}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    console.log('res of Get video tutorials=>', res);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};
export const getLectures = async (page = 1) => {
  try {
    const token = await AsyncStorage.getItem(STORAGEKEYS.token);
    const url = `${URLS.lms.lectures}?page=${page}`;
    const res = await getAuthorizedData(url, token || undefined);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
  }
};


export const resetPassword = async (values: any) => {
  try {
    const response = await postData(
      `${URLS.auth.resetPassword}`,
      values,
    );
    return response;
  } catch (error: any) {
    const res = UTILS.returnError(error);
    Alert.alert('Error in OTP verification', res);
  }
};
export const verifyToOtp = async (values: any) => {
  try {
    const response = await postData(
      `${URLS.auth.verifyOtp}`,
      values,
    );
    return response;
  } catch (error: any) {
    const res = UTILS.returnError(error);
    Alert.alert('Error in OTP verification', res);
  }
};
export const sendOtp = async (values: any) => {
  try {
    const response = await postData(
      `${URLS.auth.sendOtp}`,
      values,
    );
    return response;
  } catch (error: any) {
    const res = UTILS.returnError2(error);
    Alert.alert('Error in OTP verification', res);
  }
};

export const onLogin = (
  values: any,
  setLoading: (bool: boolean) => void,
  // props: any,
  isBack: boolean,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postData(`${URLS.auth.login}`, values);
      console.log('res of onLogin=>', res);
      await UTILS.setItem(STORAGEKEYS.token, res?.token);
      // await UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
      // const uRes = await getUserInfo();
      // console.log('userinfo', uRes);
      dispatch(setUserInfo(res?.user));
      dispatch(setRole(res?.user?.role || ''));
      resetStack('Drawer');
      console.log('login res', res);
      return res;
      // showToast({
      //   type: 'success',
      //   text1: 'Login Successful',
      //   text2: 'Welcome back!',
      // });
    } catch (error: any) {
      console.log('error in login', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
      // showToast({
      //   type: 'error',
      //   text1: 'Login Failed',
      //   text2: UTILS.returnError(error),
      // });
    } finally {
      setLoading(false);
    }
  };
};

export const updateProfile = (
  data: any,
  setProfileBtnLoading: (bool: boolean) => void,
) => {
  // return

  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setProfileBtnLoading(true);
      const res = await putData(URLS.auth.update_profile, data);
      console.log('res::::', res?.user);
      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.data?.user));
      dispatch(setUserInfo(res?.data.user || []));
      showToast({
        type: 'success',
        text1: 'Update Successful',
        text2: 'Your profile has been updated!',
      });
    } catch (error: any) {
      console.log('error in updateProfile', UTILS.returnError(error));
      // Alert.alert('', UTILS.returnError(error));
      showToast({
        type: 'error',
        text1: 'Updated Failed',
        text2: UTILS?.returnError(error),
      });
    } finally {
      setProfileBtnLoading(false);
    }
  };
};

export const onLogoutPress = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      // await logout();
      const url = `${URLS.auth.logOut}`;
      // await getData(url);
      await UTILS.clearStorage();
      dispatch(resetUser(null));
      resetStack('Splash');
    } catch (error: any) {
      console.log('error in onDeleteTask', UTILS.returnError(error));
      showToast({
        type: 'error',
        text1: 'Error',
        text2: UTILS.returnError(error),
      });
    }
  };
};

export const onSignup = (values: any) => postData(URLS.auth.signup, values);

export const onVerifyOtp = (values: any) =>
  getData(
    `${URLS.auth.verify_otp}?email=${values?.email}&otp=${values?.otp}&type=User`,
  );

export const onForgot = async (values: any) => {
  try {
    const res = await getData(
      `${URLS.auth.forgot_password}?email=${values?.email}&type=User`,
      // values,
    );
    console.log('res of onforgot=>', res);
    return res;
  } catch (error: any) {
    console.log('error in forgot password', UTILS.returnError(error));
    showToast({
      type: 'error',
      text1: 'Error',
      text2: UTILS.returnError(error),
    });
  }
};

export const onUpdatePassword = async (values: any) => {
  try {
    const res = await postData(URLS.auth.update_password, values);
    console.log('res of updateapssword=>', res);
    showToast({
      type: 'success',
      text1: 'Password Update Successful',
      text2: 'Your password has been successfully updated!',
    });
    return res;
  } catch (error: any) {
    console.log('error in updateapssword', UTILS.returnError(error));
    // Alert.alert('', UTILS.returnError(error));
    showToast({
      type: 'error',
      text1: 'Error',
      text2: UTILS.returnError(error),
    });
  }
};
export const getCountryCode = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const {userInfo} = getState()?.user;
      const res = await getData(URLS.auth.create_user);
      const codeObj = res?.country_codes;
      const newList = Object.keys(codeObj)?.map(x => ({
        code: x,
        ...codeObj[x],
      }));
      if (userInfo?.id) {
        let copy = [...newList];
        copy = copy?.map(x => ({
          ...x,
          selected: x?.code == userInfo?.code,
        }));
        dispatch(setCountries(copy));
      } else {
        dispatch(setCountries(newList));
        console.log('newList:::', newList);
      }
    } catch (error) {
      console.log('error', UTILS.returnError(error));
      // Alert.alert('Error', UTILS.returnError(error));
      showToast({
        type: 'error',
        text1: 'Error',
        text2: UTILS.returnError(error),
      });
    }
  };
};
export const onPostLocation = (values: any) =>
  postData(URLS.auth.post_location, values);

export const getDashbaord = async (slug: string) => {
  try {
    const res = await getData(URLS.auth.get_home_data);

    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    // Alert.alert('Error', UTILS.returnError(error));
    showToast({
      type: 'error',
      text1: 'Error',
      text2: UTILS.returnError(error),
    });
  }
};
export const getHomeBanner = async (slug: string) => {
  try {
    const res = await getData(URLS.auth.get_home_banner);
    return res;
  } catch (error) {
    console.log('error', UTILS.returnError(error));
    // Alert.alert('Error', UTILS.returnError(error));
    showToast({
      type: 'error',
      text1: 'Error',
      text2: UTILS.returnError(error),
    });
  }
};

export const getDistance = async (
  lat1: any,
  lat2: any,
  lon1: any,
  lon2: any,
) => {
  console.log('lat1, lat2, lon1, lon2', lat1, lat2, lon1, lon2);

  try {
    var km = 1;
    let time = 0;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&key=AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98`,
    );
    if (response?.data?.status === 'OK') {
      console.log('Distance is ');
      km = response?.data?.rows[0]?.elements[0]?.distance?.value / 1000;
      time = response?.data?.rows[0]?.elements[0]?.duration?.text;
    }
    return {km, time};
  } catch (error) {
    throw new Error(UTILS.returnError(error));
  }
};

export const postDropDown = (id: any, values: any) =>
  postData(`${URLS.app.post_fillstore}${id}`, values);

export const postPlaceOrder = (values: any) =>
  postData(`${URLS.app.place_hour_order}`, values);

export const getOrderList = (status: any) =>
  getData(`${URLS.app.get_orderlist}?status=${status}`);
export const getOrderDetails = (orderId: any) =>
  getData(`${URLS.app.get_order_details}?service_id=${orderId}`);

export const uploadImage = (data: any, setLoading: (bool: boolean) => void) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      // return

      const res = await postFormData(URLS.auth.uploadImage, data);
      console.log('res check image===>', res?.data);

      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.data?.user));
      dispatch(setUserInfo(res?.data?.user || []));
    } catch (error: any) {
      console.log('error in updateProfile', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};

// export const getNotifications = (setLoading: (bool: boolean) => void) => {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     try {
//       setLoading(true);
//       const res = await getData(URLS.notification.get_notification);
//       dispatch(setNotifications(res?.notifications || []));
//     } catch (error: any) {
//       console.log('error in notification', UTILS.returnError(error));
//       Alert.alert('', UTILS.returnError(error));
//     } finally {
//       setLoading(false);
//     }
//   };
// };

export const onReadNotification = async (notification_id: any) => {
  try {
    const res = await getData(
      `${URLS.notification.read_notification}?notification_id=${notification_id} `,
    );
    return res;
  } catch (error) {
    console.log('error in read notification', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};

export const ratingDriver = (values: any) =>
  postData(URLS.app.driver_review, values);
export const updatePassword = (values: any) =>
  postData(URLS.auth.edit_password, values);
export const getPrivacy = () => getData(URLS.auth.get_privacy);
export const getTermsAndCondition = () => getData(URLS.auth.get_term);
export const getContactUs = () => getData(URLS.auth.get_contactUs);
export const getTracking = (orderId: any) =>
  getData(`${URLS.auth.get_tracking}?order_id=${orderId}`);

export const deletePermanentAccount = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.auth.delete_account);
      console.log('res of deletaccount', res);
      // Alert.alert('Success', 'Account Deleted Successfully');
      showToast({
        type: 'success',
        text1: 'Account Deletion Successful',
        text2: 'Your account has been successfully deleted!',
      });
      dispatch(onLogoutPress());
      return res;
    } catch (error) {
      console.log('error', UTILS.returnError(error));
      // Alert.alert('Error', UTILS.returnError(error));
      showToast({
        type: 'error',
        text1: 'Error',
        text2: UTILS.returnError(error),
      });
    }
  };
};

export let IP = 'https://lms.prismaticcrm.com/api/';
export let PDFIP = 'https://ace.prismaticcrm.com/';
// export const IP = 'https://getmovers.co.uk';
// export const IP = 'https://getmovers.katashempstead.com';
export const setBaseUrls = (lmsUrl, pdfUrl) => {
  IP = `${lmsUrl.endsWith('/') ? lmsUrl : lmsUrl + '/'}`;
  PDFIP = `${pdfUrl.endsWith('/') ? pdfUrl : pdfUrl + '/'}`;
};
export const URLS = {
  base_url: `${IP}/ReimbursementRequest/`,
  leave_base_url: `${IP}/LeaveRequest/`,
  loan_base_url: `${IP}/loan/`,
  advance_base_url: `${IP}/AdvancesSelfServiceController/`,
  wfh_base_url: `${IP}/WFHRequest/`,
  complaint_base_url: `${IP}/ComplaintController/`,
  designation_base_url: `${IP}/Designation/`,
  overtime_base_url: `${IP}/SelfServiceOverTime/`,
  strike_letter_base_url: `${IP}/StrikeLetterController/`,
  emp_letters_base_url: `${IP}/EmpolyeeLatterController/`,
  letter_types_base_url: `${IP}/LetterFormatController/`,
  main_url: `${IP}/`,
  // login: `${IP}/token`,
  auth: {
    //http://194.233.79.69:92/ReimbursementRequest/FinancialYear/?_companyID=8
    // http://194.233.79.69:92/ReimbursementRequest/GetValues?fmonth=November,2024&finyear=2024-2025
    reinbursement: 'GetReimbursements/',
    reinbursementType: 'GetReimbursementTypes/',
    financialYear: 'FinancialYear/',
    requestId: 'GetValues',
    reimbursementDetails: 'GetById/',
    login: `${IP}login`,
    sendOtp: `${IP}send-otp`,
    verifyOtp: `${IP}verify-otp`,
    resetPassword: `${IP}reset-password`,
    leave_list: 'getLeaves/',
    leavetype_list: 'Loann/getLeaveCategory',
    loan_list: 'getLoanforselfservice/',
    advance_list: 'getAdvancesSelfServiceController/',
    wfh_list: 'GetWFHRequest/',
    wfh_category: 'GetWFHCategory',
    complaint_list: 'GetComplaintsOfEmoployee/',
    designation_list: 'departmentsListofEmp',
    total_employees: 'getTotEmployees/',
    overtime_list: 'getOverTimeRequests/',
    strike_letter: 'GetissueStrikeLatter/',
    strike_letter_details: 'getStrikelatter/',
    emp_letters: 'GetissueLatter/',
    emp_letters_detail: 'getlatter/',
    letter_types: 'AllFormatTypes',
    get_term: 'getUserTerms',
    get_contactUs: 'contactUsInfo',
    get_tracking: 'driverOrderLocation',
    delete_account: 'deleteAccount',
  },
  lms: {
    lectures: `${IP}lectures`,
    videoTutorials: `${IP}video-lectures`,
    assignments: `${IP}assignments`,
    submitAssignment: `${IP}assignment-submit`,
    quizzes: `${IP}quizzes`,
    startQuiz: `${IP}quizeStarted/`,
    quizReview: `${IP}quiz-result/`,
    submitQuiz: `${IP}submittedQuizze/`,
    lecture_pdf: `${PDFIP}upload/LecturesDocs/`,
  },
  fee_invoice_category: {
    paid_invoices: `${IP}fees/paid`,
    unpaid_invoices: `${IP}fee/unpaid`,
    to_be_verified: `${IP}fee-invoice/to-be-verified`,
  },
  daily_planner: {
    planner_list: `${IP}planner-list`,
  },
  app: {
    post_fillstore: 'fillStore/',
    get_orderlist: 'OrderList',
    get_order_details: 'OrderDetails',
    driver_review: 'driverReview',
    place_hour_order: 'placeOrder',
  },
  chat: {
    get_chat_messages: 'chat/messages/',
    get_latest_message: 'chat/get-new-messages/',
    get_conservation: 'chat/conversations',
    send_message: 'chat/insert-message',
    create_conservation: 'chat/create-conversation',
  },
  notification: {
    get_notification: `${IP}notifications`,
    read_notification: 'notificationRead',
  },
  config: {
    config_data: `${IP}config-data`,
  },
  newsData: {
    get_news: `${IP}news`,
  },
  helpSupport: {
    post_helpSupport: `${IP}help-support`,
    get_helpSupport: `${IP}complaints`,
  },
};

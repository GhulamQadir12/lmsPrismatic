// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';
// Create separate validation schemas
export const studentLoginValidation = yup.object().shape({
  email: yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const nonStudentLoginValidation = yup.object().shape({
  email: yup.string()
    .matches(
      /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
      'CNIC must be in the format XXXXX-XXXXXXX-X'
    )
    .required('CNIC is required'),
  password: yup.string().required('Password is required'),
});
export const forgotemailFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
});
export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  // password: yup.string().required('req_pass').min(8, 'weak_pass'),
  // confirm_password: yup
  //   .string()
  //   .required('New Password is required')
  //   .min(8, 'New weak_pass'),
});
export const renewpasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const signupFormValidation = yup.object().shape({
  first_name: yup.string().required('req_first_name'),
  // middle_name: yup.string().required('req_middle_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .string()
    .test(
      'is-ten-digits',
      'Phone number mus be less then 15 digits',
      (value: any) => {
        if (!value) return true; // Allow empty values
        return value.length <= 15 && !isNaN(value); // Check for 10 digits and numeric characters
      },
    )
    .required('Phone is required'),

  password: yup.string().required('req_password').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_confirm_password')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
  surname: yup.string().required('req_surname'),
  // gender: yup.string().required('req_gender'),
  // country_code: yup.string().required('req_country_code'),
  // house_name: yup.string().required('req_house_name'),
  // first_line_of_address: yup.string().required('req_first_line_of_address'),
  // postal_code: yup.string().required('req_postal_code'),
  // city: yup.string().required('req_city'),
  // cnic: yup.number().min(13, 'invalid_cnic'),
  // dob: yup.string().required('req_dob'),
});

export const updatePasswordValidation = yup.object().shape({
  confirm_password: yup
    .string()
    .required('New Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match') // Check if it matches 'password'
    .min(8, 'minimum 8 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'minimum 8 characters'),
});
// Example validation schema (adjust as needed)
export const helpSupportFormValidation = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

export const addAssignmentFormValidation = yup.object().shape({
  reason: yup.string().optional(),
  document: yup.mixed()
    .required('Document is required')
});
// export const updateProfileFormValidation = yup.object().shape({
//   name: yup.string().required('req_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),

//   doc_cat_id: yup.string().required('req_cat'),
//   zip_code: yup.string().required('req_zip_code'),
//   city: yup.string().required('req_city'),
//   state: yup.string().required('req_state'),
//   price: yup.string().required('req_price'),
//   experience: yup.string().required('req_experience'),
// });
// export const updateProfileFormValidation = yup.object().shape({
//   first_name: yup.string().required('req_first_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),
// });

export const updateProfileFormValidation = yup.object().shape({
  firstname: yup.string().required('req_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .string()
    .test('is-ten-digits', 'Phone must be exactly 10 digits', (value: any) => {
      if (!value) return true; // Allow empty values
      return value.length <= 15 && !isNaN(value); // Check for 10 digits and numeric characters
    })
    .required('Phone is required'),
    password: yup.string().required('req_pass').min(8, 'weak_pass'),

});
export const updatePasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const addReimbursementFormValidation = yup.object().shape({
  date: yup.date()
    .required('Request date is required')
    .nullable(),
    reimbursementType: yup.mixed()
    .required('Reimbursement Type  is required'),
    reimbursementDate: yup.date()
    .required('Request date is required')
    .nullable(),
  amount: yup.number()
    .required('Amount is required')
    .typeError('Amount must be a number')
    .min(0, 'Amount cannot be negative'),
  advancedPaid: yup.number()
    .required('Advanced Paid is required')
    .typeError('Advance Paid must be a number')
    .min(0, 'Advance Paid cannot be negative'),
  document: yup.mixed()
    .required('Document is required')
    .nullable(),
  reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
});
export const registerCourseFormValidation = yup.object().shape({
  name: yup.string().required('Name is required'),
  fathername: yup.string().required('Father Name is required'),
  cnic: yup.string()
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC format must be 00000-0000000-0')
    .required('CNIC is required'),
  mobilenumber: yup.string()
    .matches(/^\d{4}-\d{7}$/, 'Mobile format must be 0000-0000000')
    .required('Mobile Number is required'),
  programType: yup.string().required('Program Type is required'),
  branch: yup.string().required('Branch is required'),
});
export const addLoanFormValidation = yup.object().shape({
  request_date: yup.date()
    .required('date is required')
    .nullable(),
    amount: yup.number()
    .required('Amount is required')
    .nullable()
    .min(0, 'Amount cannot be negative'),
    installments: yup.number()
    .required('Installments number required')
    .nullable()
    .min(1, 'Installments must be greater than 0'),
    deduction_month: yup.date()
    .required('deduction date is required')
    .nullable(),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
   
});
export const addAdvanceFormValidation = yup.object().shape({
  request_date: yup.date()
    .required('date is required')
    .nullable(),
    advanceAmount: yup.number()
    .required('Amount is required')
    .nullable()
    .min(0, 'Amount cannot be negative'),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
   
});
export const addCompliantFormValidation = yup.object().shape({
  complainType: yup.mixed()
    .required('complain type is required')
    .nullable(),
    // departList: yup.mixed()
    // .required('department is required'),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'), 
});
export const addWFHFormValidation = yup.object().shape({
  categoryType: yup.mixed()
    .required('category type is required')
    .nullable(),
    // departList: yup.mixed()
    // .required('department is required'),
    date_from: yup.date()
    .required('date is required')
    .nullable(), 
    date_to: yup.date()
    .required('date is required')
    .nullable(), 
});
export const addOvertimeFormValidation = yup.object().shape({
    request_date: yup.date()
    .required('date is required')
    .nullable(), 
    time_from: yup.date()
    .required('date is required')
    .nullable(), 
    time_to: yup.date()
    .required('date is required')
    .nullable(), 
});

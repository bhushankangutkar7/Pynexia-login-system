import * as yup from 'yup';

const updateUserSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email()
    .max(254),
  firstName: yup
    .string()
    .trim()
    .min(2, 'First name should be atleat 2 characters long')
    .max(20, 'First name should not exceed 20 characters'),
  lastName: yup
    .string()
    .trim()
    .min(2, 'First name should be atleat 2 characters long')
    .max(20, 'First name should not exceed 20 characters'),
  password: yup
    .string()
    .min(8, 'Password should be atleast 8 characters long')
    .max(16, 'Password should not exceed 16 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[@#$%&!]/, 'Password must contain at least special character'),
  })
  .noUnknown(true)
  .test(
    'has-profile-fields',
    'At least one profile field must be provided',
    (value) => Object.keys(value || {}).length > 0,
  );

export default updateUserSchema;
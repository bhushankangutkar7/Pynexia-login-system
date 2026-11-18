import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email()
    .required()
    .max(254),
  firstName: yup
    .string()
    .trim()
    .required()
    .min(2, 'First name should be atleat 2 characters long')
    .max(20, 'First name should not exceed 20 characters'),
  lastName: yup
    .string()
    .trim()
    .required()
    .min(2, 'First name should be atleat 2 characters long')
    .max(20, 'First name should not exceed 20 characters'),
  password: yup
    .string()
    .required()
    .min(8, 'Password should be atleast 8 characters long')
    .max(16, 'Password should not exceed 16 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[@#$%&!]/, 'Password must contain at least special character'),
}).noUnknown(true);

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(8, 'Password should be atleast 8 characters long')
    .max(16, 'Password should not exceed 16 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[@#$%&!]/, 'Password must contain at least special character'),
}).noUnknown(true);

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/Constants.js';
import { loginSchema, registerSchema } from '../validators/AuthValidation.js';
import { createToken } from '../utils/JWT.js';

export const register = async (req, res, next) => {
  try {
    const validatedRegData = await registerSchema.validate(
      req.body, 
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );
    
    const user = await User.create(validatedRegData);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error('Register user error: ', err.message);
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = await loginSchema.validate(
      req.body, 
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );
    const user = await User.findOne({ email: validatedData.email }).select('+password');

    if (!user || !(await bcrypt.compare(validatedData.password, user.password))) {
      const err = new Error('Invalid email or password');
      err.statusCode = 401;
      return next(err);
    }

    return res.json({
      status: 200,
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: createToken(user._id),
      },
    });
  } catch (err) {
    console.error('Login user error: ', err.message);
    return next(err);
  }
};

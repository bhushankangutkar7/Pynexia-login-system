import express from 'express';
import * as yup from 'yup';
import User from '../models/UserModel.js';
import authenticate from '../middleware/AuthMiddleware.js';
import updateUserSchema from '../validators/UserValidation.js';


export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      '_id email firstName lastName',
    );

    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      return next(err);
    }

    return res.json({
      status: 200,
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    return next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const profileData = await updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileData },
      { new: true, runValidators: true },
    ).select('_id email firstName lastName');

    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      return next(err);
    }

    return res.json({
      status: 200,
      success: true,
      message: 'User profile updated successfully',
      data: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    return next(err);
  }
);
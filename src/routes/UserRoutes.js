import express from 'express';
import * as yup from 'yup';
import User from '../models/UserModel.js';
import authenticate from '../middleware/AuthMiddleware.js';
import updateUserSchema from '../validators/UserValidation.js';
import { getMe, updateMe } from '../controller/UserController.js';

const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.get('/me', getMe);
userRouter.patch('/me', updateMe);

export default userRouter;
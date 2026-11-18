import express from 'express';
import { login, register } from '../controller/AuthController.js';
import authenticate from '../middleware/AuthMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;

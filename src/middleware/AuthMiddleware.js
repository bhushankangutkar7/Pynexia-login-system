import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/Constants.js';
import { decodeToken } from '../utils/JWT.js';

const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;
  const match = authorization && /^Bearer ([^\s]+)$/.exec(authorization);
  const token = match && match[1];

  if (!token) {
    const err = new Error('Authentication required');
    err.statusCode = 401;
    return next(err);
  }

  try {
    const payload = decodeToken(token);

    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
      const err = new Error('Invalid or expired token');
      err.statusCode = 401;
      return next(err);
    }

    req.user = { id: payload.sub };
    return next();
  } catch (err) {
    const unauthorizedError = new Error('Invalid or expired token');
    unauthorizedError.statusCode = 401;
    return next(unauthorizedError);
  }
};

export default authenticate;

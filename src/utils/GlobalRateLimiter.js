import { rateLimit } from 'express-rate-limit';
import { ENV } from '../config/Constants.js';

const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: ENV === 'production' ? 50 : 1000, // 50 requests per minute
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

export default globalRateLimiter;
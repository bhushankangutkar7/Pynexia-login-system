import { configDotenv } from 'dotenv';

configDotenv({
  path: './.env'
});

export const ENV = process.env.ENV;
export const PORT = Number(process.env.PORT);
export const MONGO_URL = String(process.env.MONGO_URL);
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
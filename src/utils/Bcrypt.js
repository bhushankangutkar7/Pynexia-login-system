import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/Constants.js';

export const hashPassword = async (password) => {
  try{
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch(err) {
    console.error('Pasword hashing failed', err.message);
    next(err);
  };
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  try{
    const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword);
    return isPasswordCorrect;
  } catch(err) {
    console.error('Pasword compare failed', err.message);
    next(err);
  };
};

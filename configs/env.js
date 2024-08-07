
import dotenv from 'dotenv';
import { mongo } from 'mongoose';

dotenv.config();

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  jwt: process.env.JWT_SECRET,
};

import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: process.env.PORT || 3000,
};

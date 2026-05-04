import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '.env')
});

export const config = {
  baseURL: process.env.BASE_API_URL as string
};
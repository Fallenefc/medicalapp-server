// import { GMAIL_PASSWORD, GMAIL } from '../tempFixSecretForNow';
import dotenv from 'dotenv';

dotenv.config();

interface Auth {
  user: string,
  pass: string,
}

interface SmptConfig {
  host: string,
  port: number,
  secure: boolean
  auth: Auth
}

const smptConfig: SmptConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
};

export default smptConfig;

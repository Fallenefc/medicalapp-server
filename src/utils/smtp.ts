import { GMAIL_PASSWORD, GMAIL } from '../tempFixSecretForNow';

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
    user: GMAIL,
    pass: GMAIL_PASSWORD,
  },
};

export default smptConfig;

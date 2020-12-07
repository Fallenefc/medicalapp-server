import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import smptConfig from './smtp';

dotenv.config();

const sendEmail = async (receiver: string, content: string) => {
  try {
    const transporter = nodemailer.createTransport(smptConfig);

    const info = await transporter.sendMail({
      from: `"${process.env.GMAIL_NAME}" <${process.env.GMAIL}>`,
      to: receiver,
      bcc: `${process.env.GMAIL}`, // delete before production
      subject: 'Change password',
      html: content,
    });

    console.log(`Message sent: ${info.messageId}`);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error(`Error while sending email ${err}`);
  }
};

export default sendEmail;

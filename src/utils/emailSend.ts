import nodemailer from 'nodemailer';
import smptConfig from './smtp';

const sendEmail = async (receiver: string, content: string) => {
  try {
    const transporter = nodemailer.createTransport(smptConfig);

    console.log(smptConfig);

    const info = await transporter.sendMail({
      from: '"Bloodworks" <bloodworksapp@gmail.com>',
      to: receiver,
      bcc: 'bloodworksapp@gmail.com', // delete before production
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

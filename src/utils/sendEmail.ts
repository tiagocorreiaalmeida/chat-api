import smtpTransport from '../config/nodemailer';

const isProd = process.env.NODE_ENV === 'PROD';

export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
): Promise<void> => {
  if (isProd) {
    const mailOptions = {
      to,
      subject,
      html: htmlContent,
    };

    await smtpTransport.sendMail(mailOptions);
  }

  return;
};

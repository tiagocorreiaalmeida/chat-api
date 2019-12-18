import nodemailer from 'nodemailer';

const { MAILER_EMAIL, MAILER_PASSWORD } = process.env;

const smtpTransport = nodemailer.createTransport({
  pool: true,
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
  },
});

export default smtpTransport;

import nodemailer from "nodemailer";

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD;
const SENDER_SMTP = process.env.SENDER_SMTP

export const transporter =  nodemailer.createTransport({
    host: SENDER_SMTP,
    port: 465,
    pool: true,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD,
    },
  });


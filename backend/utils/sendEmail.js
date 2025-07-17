// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // Use true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // Required for some providers if you're getting "self signed certificate" errors
      rejectUnauthorized: false
    }
  });

  const message = {
    from: `${process.env.EMAIL_USER}`, // Sender address
    to: options.email, // List of receivers
    subject: options.subject, // Subject line
    html: options.html, // HTML body
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
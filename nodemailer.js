const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NODE_MAILER_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent sucessfully');
  } catch (error) {
    console.log('email not sent');
    console.log(error);
  }
};

module.exports = sendEmail;

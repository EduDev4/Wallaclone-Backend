const nodemailer = require('nodemailer');

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    transporter.sendMail(message, (err, info) => {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
}

exports.sendResetPasswordEmail = ({ toUser }, hash) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser,
    subject: 'Your Wallaclone - Reset Password',
    html: `
        <h3> Hello </h3>
        <p>To reset your password please follow this link: <a target="_" href="${process.env.DOMAIN}/resetpass/${hash}">${process.env.DOMAIN}/resetpass</a></p>
        <p>Cheers</p>
        <p>Your Wallaclone Team</p>
      `,
  };
  console.log(message);
  return sendEmail(message);
};

exports.sendConfirmationEmail = ({ toUser }) => {
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser,
    subject: 'Password change confirmation email',
    html: `
        <h3> Hello </h3>
        <p>Thank you! Your password has been changed</p>
        <p>Cheers</p>
        <p>Your Wallaclone Team</p>
      `,
  };
  console.log(message);
  return sendEmail(message);
};

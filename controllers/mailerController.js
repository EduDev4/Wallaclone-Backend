const sender = require('./sendgridController.js');

exports.sendResetPasswordEmail = ({ toUser }, hash) => {
  // eslint-disable-next-line no-template-curly-in-string
  const url = `${process.env.DOMAIN}/resetpass/${hash}`;

  const message = {
    //name of the email template that we will be using
    templateName: 'password_reset_link',
    //sender's and receiver's email
    receiver: toUser,
    //unique url for the user to confirm the account
    confirm_account_url: url,
  };
  //pass the data object to send the email
  return sender.sendEmail(message);
};
exports.sendConfirmationEmail = ({ toUser }, hash) => {
  const url = `${process.env.DOMAIN}/user/confirm/${hash}`;
  const message = {
    //name of the email template that we will be using
    templateName: 'password_reset_confirm',
    //sender's and receiver's email
    activate_email_url: url,
    receiver: toUser,
  };
  //pass the data object to send the email
  return sender.sendEmail(message);
};

exports.sendUnsubscribeEmail = ({ toUser }) => {
  const message = {
    //name of the email template that we will be using
    templateName: 'user_deletion',
    //sender's and receiver's email
    receiver: toUser,
  };
  //pass the data object to send the email
  return sender.sendEmail(message);
};

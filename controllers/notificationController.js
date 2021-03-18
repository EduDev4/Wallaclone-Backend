const sender = require('./sendgridController.js');

exports.sendEmailNotification = ({ toUser }, text, callbackPath) => {
  // eslint-disable-next-line no-template-curly-in-string
  const url = `${process.env.DOMAIN}${callbackPath}`;

  const message = {
    //name of the email template that we will be using
    templateName: 'generic_notification',
    //sender's and receiver's email
    receiver: toUser,
    text: text,
    //unique url for the user to confirm the account
    url_callback: url,
  };
  //pass the data object to send the email
  return sender.sendEmail(message);
};

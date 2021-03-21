/**
 * SERVICE to send email notifications to users
 */

require('dotenv').config();
const cote = require('cote');
const sender = require('../controllers/sendgridController');

const responderNotify = new cote.Responder({
  name: 'Email notification responder',
  key: 'notification',
});

// When user create an advert with image
responderNotify.on('Send notification email', async (req, done) => {
  try {
    req.toUser.forEach(async userEmail => {
      const message = {
        //name of the email template that we will be using
        templateName: 'generic_notification',
        //sender's and receiver's email
        receiver: userEmail,
        text: req.text,
        //unique url for the user to confirm the account
        url_callback: req.url_callback,
      };
      //pass the data object to send the email

      console.log(
        `Service: notification email received to: ${userEmail} from client ... OK ${Date.now().toString()}`,
      );
      console.log(`Service: sending notification email ...`);
      await sender.sendEmail(message);

      // if everything went well, notification is sended, return name
      console.log(
        `Service: notification email to ${userEmail} ... OK ${Date.now()}`,
      );
    });
    done(req.toUser);
  } catch (err) {
    console.log(err);
  }
});

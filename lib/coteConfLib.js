const cote = require('cote');

// Declare client for thumbnail service (create and delete)
// const requester = new cote.Requester({ name: 'Client' });
const thumbnailRequester = new cote.Requester({
  name: 'Thumbnail Requester',
  key: 'thumbnail',
});

const notificationRequester = new cote.Requester({
  name: 'Notification Requester',
  key: 'notification',
});

exports.createThumb = (imageName, imagePath) => {
  thumbnailRequester.send(
    {
      type: 'make thumbnail',
      imageName,
      imagePath,
    },
    result => {
      console.log(`New thumbnail: ${result}`, Date.now());
    },
  );
};

exports.deleteThumb = thumbPath => {
  thumbnailRequester.send(
    {
      type: 'delete thumbnail',
      thumbPath,
    },
    result => {
      console.log(result, Date.now());
    },
  );
};

exports.sendEmailNotification = ({ toUser }, text, callbackPath) => {
  // eslint-disable-next-line no-template-curly-in-string
  const url = `${
    process.env.NODE_ENV === 'production'
      ? process.env.DOMAIN_PROD
      : process.env.DOMAIN
  }${callbackPath}`;

  notificationRequester.send(
    {
      type: 'Send notification email',
      toUser,
      text,
      url_callback: url,
    },
    result => {
      console.log(`New email notification to: ${result}`, Date.now());
    },
  );
};

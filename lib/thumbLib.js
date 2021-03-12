const cote = require('cote');

// Declare client for thumbnail service (create and delete)
const requester = new cote.Requester({ name: 'thumbnail client' });

exports.createThumb = (imageName, imagePath) => {
  requester.send(
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
  requester.send(
    {
      type: 'delete thumbnail',
      thumbPath,
    },
    result => {
      console.log(result, Date.now());
    },
  );
};

const cote = require('cote');

// Declare client for thumbnail service (create and delete)
const requester = new cote.Requester({ name: 'thumbnail client' });

exports.createThumb = (imagename, imagepath) => {
  requester.send(
    {
      type: 'make thumbnail',
      imagename,
      imagepath,
    },
    result => {
      console.log(`New thumbnail: ${result}`, Date.now());
    },
  );
};

exports.deleteThumb = imagename => {
  requester.send(
    {
      type: 'delete thumbnail',
      imagename,
    },
    result => {
      console.log(result, Date.now());
    },
  );
};

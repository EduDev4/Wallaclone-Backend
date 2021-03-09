/**
 * SERVICE to make thumbnails images from original
 * advert image. When an advert is created and upload
 * new image, this one create another copy with size 100x100px
 */

const cote = require('cote');
const Jimp = require('jimp');
const fs = require('fs');

const responder = new cote.Responder({ name: 'thumbnail responder' });
const thumbDirPath = 'public/img/adverts/thumbnails/';

// When user create an advert with image
responder.on('make thumbnail', async (req, done) => {
  try {
    const thumbName = `thumb_${req.imagename}`;
    console.log(
      `Service: received image ${
        req.imagename
      } from client ... OK ${Date.now().toString()}`,
    );
    console.log(`Service: creating thumbnail ...`);

    await (await Jimp.read(req.imagepath))
      .scaleToFit(120, 120)
      .write(`${thumbDirPath}${thumbName}`);

    // if everything went well, thumbnail is created, return name
    console.log(`Service: thumbnail ${thumbName} created ... OK ${Date.now()}`);
    done(thumbName);
  } catch (err) {
    console.log(err);
  }
});

// When user delete an advert, delete thumbnail
responder.on('delete thumbnail', (req, done) => {
  const thumbName = `thumb_${req.imagename}`;
  console.log(
    `Service: received image ${req.imagename} form client ... OK ${Date.now()}`,
  );

  console.log(`Service: deleting thumbnail ...`);

  fs.unlink(`${thumbDirPath}${thumbName}`, err => {
    if (err) {
      console.log(`Service: failed to delete local image => ${err}`);
      done();
    } else {
      console.log(
        `Service: thumbnail ${thumbName} deleted ... OK ${Date.now()}`,
      );
      // if everything went well, thumbnail is deleted
      done('Delete successfully!');
    }
  });
});

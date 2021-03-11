/**
 * SERVICE to make thumbnails images from original
 * advert image. When an advert is created and upload
 * new image, this one create another copy with size 100x100px
 */

const cote = require('cote');
const Jimp = require('jimp');
const fs = require('fs');

const responder = new cote.Responder({ name: 'thumbnail responder' });

// When user create an advert with image
responder.on('make thumbnail', async (req, done) => {
  try {
    const thumbName = `thumb_${req.imageName}`;
    console.log(
      `Service: received image ${
        req.imageName
      } from client ... OK ${Date.now().toString()}`,
    );
    console.log(`Service: creating thumbnail ...`);

    await (await Jimp.read(`${req.imagePath}${req.imageName}`))
      .scaleToFit(120, 120)
      .write(`${req.imagePath}thumbnails/${thumbName}`);

    // if everything went well, thumbnail is created, return name
    console.log(`Service: thumbnail ${thumbName} created ... OK ${Date.now()}`);
    done(thumbName);
  } catch (err) {
    console.log(err);
  }
});

// When user delete an advert, delete thumbnail
responder.on('delete thumbnail', (req, done) => {
  const thumbPath = `./public/img/adverts/${req.userId}/thumbnails/thumb_${req.imageName}`;
  console.log(
    `Service: received image ${req.imageName} form client ... OK ${Date.now()}`,
  );

  console.log(`Service: deleting thumbnail ...`);

  fs.unlink(thumbPath, err => {
    if (err) {
      console.log(`Service: failed to delete local image => ${err}`);
      done();
    } else {
      console.log(
        `Service: thumbnail ${req.imageName} deleted ... OK ${Date.now()}`,
      );
      // if everything went well, thumbnail is deleted
      done('Delete successfully!');
    }
  });
});

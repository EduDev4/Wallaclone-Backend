/**
 * SERVICE to make thumbnails images from original
 * advert image. When an advert is created and upload
 * new image, this one create another copy with size 120x120px
 */

const cote = require('cote');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const responder = new cote.Responder({
  name: 'Thumbnail responder',
  key: 'thumbnail',
});

// When user create an advert with image
responder.on('make thumbnail', async (req, done) => {
  try {
    const thumbName = `thumb_${req.imageName}`;
    const thumbPath = path.join(req.imagePath, 'thumbnails', thumbName);
    console.log(
      `Service: received image ${
        req.imageName
      } from client ... OK ${Date.now().toString()}`,
    );
    console.log(`Service: creating thumbnail ...`);
    await (await Jimp.read(`${req.imagePath}${req.imageName}`))
      .scaleToFit(120, 120)
      .write(thumbPath);

    // if everything went well, thumbnail is created, return name
    console.log(`Service: thumbnail ${thumbName} created ... OK ${Date.now()}`);
    done(thumbName);
  } catch (err) {
    console.log(err);
  }
});

// When user delete an advert, delete thumbnail
responder.on('delete thumbnail', (req, done) => {
  const thumbRelPath = path.join('./public', req.thumbPath);
  console.log(
    `Service: received image ${path.basename(
      req.thumbPath,
    )} form client ... OK ${Date.now()}`,
  );

  console.log(`Service: deleting thumbnail ...`);

  fs.unlink(thumbRelPath, err => {
    if (err) {
      console.log(`Service: failed to delete local image => ${err}`);
      done();
    } else {
      console.log(
        `Service: thumbnail ${path.basename(
          req.thumbPath,
        )} deleted ... OK ${Date.now()}`,
      );
      // if everything went well, thumbnail is deleted
      done('Thumbnail delete successfully!');
    }
  });
});

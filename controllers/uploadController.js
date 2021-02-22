const fs = require('fs');

const multer = require('multer');

const storageAdvImg = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./public/img/adverts/${req.userId}/`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    const myFilename = `${Date.now()}_${file.originalname}`;
    cb(null, myFilename);
  },
});

const uploadAdvImg = multer({ storage: storageAdvImg }).single('image');

module.exports = uploadAdvImg;

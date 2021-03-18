const fs = require('fs');
const createError = require('http-errors');

const path = require('path');
const Advert = require('../models/Advert');
const User = require('../models/User');
const { createThumb, deleteThumb } = require('../lib/thumbLib');
const { getFilterObj } = require('../utils/apiFilter');
const { sendEmailNotification } = require('./notificationController');
/* Get Adverts */
const getAllAdverts = async (req, res, next) => {
  try {
    const filterObj = getFilterObj(req.query);

    if (req.query.username) {
      const { _id } = await User.findOne({ username: req.query.username });
      if (_id) filterObj.createdBy = _id;
    }

    const sortBy = req.query.sort
      ? req.query.sort.split(',').join(' ')
      : 'createdAt';

    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    const start = req.query.start * 1 || 1;
    const limit = req.query.limit * 1 || 12;
    const skip = (start - 1) * limit;

    const TotalAdverts = await Advert.countDocuments(filterObj);
    const pages = Math.ceil(TotalAdverts / 12);

    const adverts = await Advert.listAdverts(
      filterObj,
      sortBy,
      fields,
      limit,
      skip,
    );

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        pages,
        results: TotalAdverts,
        adverts: adverts,
      },
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

const createAdvert = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace('public', '');
      createThumb(req.file.filename, req.file.destination);

      req.body.thumb = `${path.join(
        req.file.destination.substr(8),
        'thumbnails',
        `thumb_${req.file.filename}`,
      )}`;
    }

    // Add user id to new advert
    req.body.createdBy = req.userId;
    const { _id } = await Advert.create(req.body);
    const newAdvert = await Advert.findOne({ _id }).populate(
      'createdBy',
      'username',
    );
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert: newAdvert,
      },
    });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
      deleteThumb(
        `${path.join(
          req.file.destination.substr(8),
          'thumbnails',
          `thumb_${req.file.filename}`,
        )}`,
      );
    }
    next(createError(422, err.message));
  }
};

const updateAdvertById = async (req, res, next) => {
  try {
    const adv = await Advert.findById(req.params.id);

    if (!adv) return next(createError(404, req.__('Advert not found!')));

    // Check if the advert is created by user
    if (adv.createdBy.toString() !== req.userId) {
      return next(createError(401, req.__('Unauthorized Request!!')));
    }

    // If there is a new image, delete the previous one
    if (req.file) {
      if (adv.image) {
        fs.unlinkSync(path.join('public', adv.image));

        // Send previous image name to thumbnail service for delete
        deleteThumb(adv.thumb);
      }

      // Send new image name to thumbnail service for create
      createThumb(req.file.filename, req.file.destination);

      // Update parameter with image name
      req.body.image = req.file.path.replace('public', '');
      req.body.thumb = `${path.join(
        req.file.destination.substr(8),
        'thumbnails',
        `thumb_${req.file.filename}`,
      )}`;
    }

    // Update the advert
    const { _id } = await Advert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const advertUpd = await Advert.findOne({ _id }).populate(
      'createdBy',
      'username',
    );

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert: advertUpd,
      },
    });
  } catch (err) {
    if (req.file) {
      deleteThumb(
        `${path.join(
          req.file.destination.substr(8),
          'thumbnails',
          `thumb_${req.file.filename}`,
        )}`,
      );
      fs.unlinkSync(req.file.path);
    }
    next(createError(422, err.message));
  }
};

/** Delete Advert */
const deleteAdvertById = async (req, res, next) => {
  try {
    // First, check if there is an image and delete it
    const advert = await Advert.findById(req.params.id);
    const user = await User.findById(req.userId);

    if (!advert) return next(createError(404, req.__('Advert not found!')));

    // Check if the advert is created by user
    if (advert.createdBy.toString() !== req.userId) {
      return next(createError(401, req.__('Unauthorized Request!!')));
    }

    if (advert.image) {
      fs.unlinkSync(path.join('public', advert.image));

      // Send previous image name to thumbnail service for delete
      deleteThumb(advert.thumb);
    }

    // Second, delete advert from DB
    await Advert.findByIdAndRemove(req.params.id);

    await sendEmailNotification(
      { toUser: user.email },
      `Anuncio Eliminado: ${advert.name}`,
      '/adverts',
    );

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

/** Get Advert Detail */
const getAdvertById = async (req, res, next) => {
  try {
    const advert = await Advert.findOne({ _id: req.params.id }).populate(
      'createdBy',
      'username',
    );

    if (!advert) return next(createError(404, req._('Advert not found!')));
    // console.log(advert);

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert,
      },
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

/** Get all tags availables */
const getAllExistTags = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tags: Advert.allowedTags(),
    },
  });
};

/** Delete all user adverts */
const deleteAllUserAds = async (req, res, next) => {
  try {
    // Delete all user adverts
    await Advert.deleteMany({ createdBy: req.userId });
    fs.rmdirSync(`public/img/adverts/${req.userId}`, { recursive: true });
    next();
  } catch (err) {
    // console.log(err);
    return next(createError(400, err.message));
  }
};

module.exports = {
  getAllAdverts,
  createAdvert,
  updateAdvertById,
  deleteAdvertById,
  getAdvertById,
  getAllExistTags,
  deleteAllUserAds,
};

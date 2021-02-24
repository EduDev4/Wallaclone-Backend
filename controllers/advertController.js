const fs = require('fs');
const createError = require('http-errors');

const Advert = require('../models/Advert');
const { createThumb, deleteThumb } = require('../lib/thumbLib');
const { getFilterObj } = require('../utils/apiFilter');

// TODO: Obtener lista de todos los tags (getTags)

/* Get Adverts */
const getAllAdverts = async (req, res, next) => {
  try {
    const filterObj = getFilterObj(req.query);

    const sortBy = req.query.sort
      ? req.query.sort.split(',').join(' ')
      : 'createdAt';

    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    const start = req.query.start * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (start - 1) * limit;

    const adverts = await Advert.listAdverts(
      filterObj,
      sortBy,
      fields,
      limit,
      skip,
    );

    console.log(adverts);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        results: adverts.length,
        adverts: adverts,
      },
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

/** Create Advert */
const createAdvert = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace('public', '');
    }

    // Add user id to new advert
    req.body.createdBy = req.userId;

    const newAdvert = await Advert.create(req.body);

    // Before response, send image path to thumbnail service
    if (req.file) {
      createThumb(req.file.filename, req.file.path);
    }

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
      deleteThumb(req.file.filename);
    }
    next(createError(422, err.message));
  }
};

/** Update Advert */
const updateAdvertById = async (req, res, next) => {
  try {
    const adv = await Advert.findById(req.params.id);

    if (!adv) return next(createError(404, 'Advert not found!'));

    // Check if the advert is created by user
    if (adv.createdBy.toString() !== req.userId) {
      return next(createError(401, 'Unauthorized Request!!'));
    }

    // If there is a new image, delete the previous one
    if (req.file) {
      fs.unlinkSync(`public${adv.image}`);

      // Send previous image name to thumbnail service for delete
      deleteThumb(adv.image);

      // Send new image name to thumbnail service for create
      createThumb(req.file.filename, req.file.path);

      // Update parameter with image name
      req.body.image = req.file.path.replace('public/', '');
    }

    // Update the advert
    const advertUpd = await Advert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        advert: advertUpd,
      },
    });
  } catch (err) {
    if (req.file) {
      deleteThumb(req.file.filename);
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

    if (!advert) return next(createError(404, 'Advert not found!'));

    // Check if the advert is created by user
    if (advert.createdBy.toString() !== req.userId) {
      return next(createError(401, 'Unauthorized Request!!'));
    }

    if (!advert.image.includes('noAdImage')) {
      fs.unlinkSync(`public${advert.image}`);

      // Send image name to deleting thumbnail service
      deleteThumb(advert.image);
    }

    // Second, delete advert from DB
    await Advert.findByIdAndRemove(req.params.id);

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
    const advert = await Advert.findById(req.params.id);

    if (!advert) return next(createError(404, 'Advert not found!'));

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

module.exports = {
  getAllAdverts,
  createAdvert,
  updateAdvertById,
  deleteAdvertById,
  getAdvertById,
};

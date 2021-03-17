const fs = require('fs');
const createError = require('http-errors');

const path = require('path');
const Advert = require('../models/Advert');
const User = require('../models/User');
const { createThumb, deleteThumb } = require('../lib/thumbLib');
const { getFilterObj } = require('../utils/apiFilter');

// TODO: Obtener lista de todos los tags (getTags)

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

/**
 * @api {post} /apiv1/adverts/ 3.Create an advert (requires auth token)
 * @apiName PostAdvert
 * @apiGroup Adverts
 * @apiDescription Create one advert, content in the body (form-data)
 *
 * @apiHeader (Header) {String} Authorization Format: "Bearer **user-token**"
 * @apiParam (Querystring) {String} lang Response language: default 'en' ['en', 'es']
 * @apiParam (Body) {file} image Advert file image (jpg/png)
 * @apiParam (Body) {String} name Advert name
 * @apiParam (Body) {Number} price Advert price
 * @apiParam (Body) {String} description Advert description
 * @apiParam (Body) {Boolean} sale Advert type (to sale:true, to buy: false)
 * @apiParam (Body) {String[]} tags Advert tags ('motor', 'fashion', 'electronics', ...)
 * @apiParamExample {json} Input
 *    {
 *      "image": "galaxytab.jpg",
 *      "name": "Tel 4 user1",
 *      "price": 100,
 *      "description": "Tablet 10 pulgadas en perfecto estado",
 *      "sale": "true",
 *      "tags": "work"
 *    }
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data created
 * @apiSuccessExample {json} Success
 *   {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "advert": {
 *           "sale": true,
 *           "image": "/img/adverts/6038bba6e41a860519d142b5/1614336286863_galaxytab.jpg",
 *           "tags": [
 *               "work"
 *           ],
 *           "state": "Available",
 *           "_id": "6038d11e7a90c90b105726d4",
 *           "name": "Tel 4 user1",
 *           "price": 100,
 *           "description": "Tablet 10 pulgadas en perfecto estado",
 *           "createdBy": "6038bba6e41a860519d142b5",
 *           "createdAt": "2021-02-26T10:44:46.873Z",
 *           "updatedAt": "2021-02-26T10:44:46.873Z",
 *           "__v": 0
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "Advert validation failed: name: An advert must have a name"
 *    }
 */

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

/**
 * @api {put} /apiv1/adverts/:id 4.Update an advert (requires auth token)
 * @apiName PutAdvert
 * @apiGroup Adverts
 *
 * @apiDescription Update one advert by id param
 *
 * @apiHeader (Header) {String} Authorization Format: "Bearer **user-token**"
 * @apiParam (Querystring) {String} id Advert unique ID
 * @apiParam (Querystring) {String} lang Response language: default 'en' ['en', 'es']
 * @apiParam (Body) {file} image Advert file image (jpg/png)
 * @apiParam (Body) {String} name Advert name
 * @apiParam (Body) {Number} price Advert price
 * @apiParam (Body) {String} description Advert description
 * @apiParam (Body) {Boolean} sale Advert type (to sale:true, to buy: false)
 * @apiParam (Body) {String[]} tags Advert tags ('motor', 'fashion', 'electronics', ...)
 * @apiParamExample {json} Input
 *    {
 *      "name": "Galaxy Tab 10.1",
 *      "price": 80,
 *      "tags": "['work','electronics']"
 *    }
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data updated
 * @apiSuccessExample {json} Success
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "advert": {
 *           "sale": true,
 *           "image": "/img/adverts/6038bba6e41a860519d142b5/1614336286863_galaxytab.jpg",
 *           "tags": [
 *               "work",
 *               "electronics"
 *           ],
 *           "state": "Available",
 *           "_id": "6038d11e7a90c90b105726d4",
 *           "name": "Galaxy Tab 10.1",
 *           "price": 80,
 *           "description": "Tablet 10 pulgadas en perfecto estado",
 *           "createdBy": "6038bba6e41a860519d142b5",
 *           "createdAt": "2021-02-26T10:44:46.873Z",
 *           "updatedAt": "2021-02-26T11:29:58.647Z",
 *           "__v": 0
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "Advert validation failed: name: An advert must have a name"
 *    }
 */

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
    console.log(err);
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

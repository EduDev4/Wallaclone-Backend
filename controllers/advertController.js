const fs = require('fs');
const createError = require('http-errors');

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
      createThumb(req.file.filename, req.file.path);
    }

    // Add user id to new advert
    req.body.createdBy = req.userId;

    const newAdvert = await Advert.create(req.body);

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
      fs.unlinkSync(`public/${adv.image}`);

      // Send previous image name to thumbnail service for delete
      deleteThumb(adv.image.split('/')[adv.image.split('/').length - 1]);

      // Send new image name to thumbnail service for create
      createThumb(req.file.filename, req.file.path);

      // Update parameter with image name
      req.body.image = req.file.path.replace('public', '');
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

    if (!advert) return next(createError(404, req.__('Advert not found!')));

    // Check if the advert is created by user
    if (advert.createdBy.toString() !== req.userId) {
      return next(createError(401, req.__('Unauthorized Request!!')));
    }

    if (!advert.image.includes('noAdImage')) {
      fs.unlinkSync(`public${advert.image}`);

      // Send image name to deleting thumbnail service
      // deleteThumb(advert.image);
      deleteThumb(advert.image.split('/')[advert.image.split('/').length - 1]);
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

    if (!advert) return next(createError(404, req._('Advert not found!')));

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

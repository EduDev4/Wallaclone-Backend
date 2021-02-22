const express = require('express');

const router = express.Router();

const jwtAuth = require('../../lib/jwtAuth');
const uploadAdvImg = require('../../controllers/uploadController');

// import functions from controller
const {
  getAllAdverts,
  createAdvert,
  updateAdvertById,
  deleteAdvertById,
  getAdvertById,
} = require('../../controllers/advertController');

/** Adverts Routes all request from /apiv1/adverts/ */

/* GET /, Get adverts list */
/* POST /, Create advert */
router
  .route('/')
  .get(getAllAdverts)
  .post(jwtAuth(), uploadAdvImg, createAdvert);

/* GET /tags */

/* GET /:id, Get an advert detail */
/* PUT /:id, Update an advert */
/* DELETE /:id, Delete an advert */
router
  .route('/:id')
  .get(getAdvertById)
  .put(jwtAuth(), uploadAdvImg, updateAdvertById)
  .delete(jwtAuth(), deleteAdvertById);

module.exports = router;

router.route('/').get(getAllAdverts);

module.exports = router;

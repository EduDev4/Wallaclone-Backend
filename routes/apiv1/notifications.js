const express = require('express');

const router = express.Router();

const jwtAuth = require('../../lib/jwtAuth');

// import functions from controller
const {
  createNotification,
} = require('../../controllers/notificationController');

/** Notifications Routes all request from /apiv1/notifications/ */

/* GET /, Get notification list */
/* POST /, Create notification */
router
  .route('/')
  //.get(getNotifications)
  .post(jwtAuth(), createNotification);

/* GET /:id, Get a notification detail */
/* DELETE /:id, Delete an notification */
/* router
  .route('/:id')
  .get(getAdvertById)
  .put(jwtAuth(), uploadAdvImg, updateAdvertById)
  .delete(jwtAuth(), deleteAdvertById);
 */
module.exports = router;

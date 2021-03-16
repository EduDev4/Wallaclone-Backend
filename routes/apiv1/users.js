const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');

const userController = require('../../controllers/userController');
const advertController = require('../../controllers/advertController');

router.use(bodyParser.json());

/** Users Routes all request from /apiv1/users/ */

/* POST /auth, Login user */
router.post('/auth', userController.login);

/* POST /, User Signup */
/* DELETE /, Delete User */
router
  .route('/')
  .post(userController.signup)
  .delete(
    jwtAuth(),
    advertController.deleteAllUserAds,
    userController.deleteUser,
  );

/* GET /confirm/:token, User Signup Confirm */
router.get('/confirm/:token', userController.signupConfirmation);

/* PUT /users/forgotPass, User fortgot pass */
router.put('/forgotPass', userController.forgotPass);

/* POST /users/forgotPass/confirmation, User forgot pass confirm */
router.post('/forgotPass/confirmation', userController.forgotPassConfirm);

/* POST /users/favs/:adId, Set or Delete favorite */
/* GET /users/favs, Get all favorites adverts from user */
router.post('/favs/:adId', jwtAuth(), userController.setUnsetFav);
router.get('/favs', jwtAuth(), userController.getUserFavs);
/* POST /users/sold/:adId, Set or Delete sold */
/* GET /users/sold, Get all sold adverts from user */
router.post('/sold/:adId', jwtAuth(), userController.setUnsetSold);
router.get('/sold', jwtAuth(), userController.getUserSold);

/* POST /users/reservation/:adId, Set or Delete reserved */
/* GET /users/reserved, Get all reserved adverts from user */
router.post('/reservation/:adId', jwtAuth(), userController.setUnsetReserved);
router.get('/reserved', jwtAuth(), userController.getUserReserved);

/* PATCH /users/editUser/:username, Edit user data */
router.patch('/editUser/:username', jwtAuth(), userController.updateUserData);

/* GET /:id (Get username from userId) */
router.get('/:id', jwtAuth(), userController.getUserNameFromId);

module.exports = router;

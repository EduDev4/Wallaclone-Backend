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

module.exports = router;

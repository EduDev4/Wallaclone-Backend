const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const router = express.Router();

const userController = require('../../controllers/userController');

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// };

router.use(bodyParser.json());
// router.use(cors(corsOptions));

/** Users Routes all request from /apiv1/users/ */

/* POST /auth, Login user */
router.post('/auth', userController.login);

/* POST /, User Signup */
/* GET /confirm/:token, User Signup Confirm */
router.post('/', userController.signup);
router.get('/confirm/:token', userController.signupConfirmation);

/* PUT /users/forgotPass, User fortgot pass */
router.put('/forgotPass', userController.forgotPass);

/* POST /users/forgotPass/confirmation, User forgot pass confirm */
router.post('/forgotPass/confirmation', userController.forgotPassConfirm);

module.exports = router;

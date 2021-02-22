const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const cors = require('cors');

const router = express.Router();
const User = require('../../models/User');

const {
  sendResetPasswordEmail,
  sendConfirmationEmail,
} = require('../../controllers/mailerController');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

router.use(bodyParser.json());
router.use(cors(corsOptions));

/* GET /users */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/* PUT /users/forgotPass */
router.put('/forgotPass', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.find({ email });
    if (!user) {
      return res.status(422).send("User email doesn't exist!");
    }
    const hash = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const obj = {
      hash: hash,
    };
    const newUser = _.extend(...user, obj);
    await newUser.save();
    await sendResetPasswordEmail({ toUser: email }, hash);
    return res.json({
      message: 'Please check your email in order to reset the password!',
    });
  } catch {
    return res.status(422).send('Ooops, something went wrong!');
  }
});

/* POST /users/forgotPass/confirmation */
router.post('/forgotPass/confirmation', async (req, res) => {
  const { passwd, hash } = req.body;
  const user = await User.find({ hash });
  const { email } = user[0];

  try {
    const obj = {
      passwd: await User.hashPassword(passwd),
      hash: hash,
    };
    const newUser = _.extend(...user, obj);
    await newUser.save();
    await sendConfirmationEmail({ toUser: email });
    return res.json({ message: 'Password has been resseted' });
  } catch {
    return res.status(422).send('Ooops, something went wrong!');
  }
});

module.exports = router;

const express = require('express');

const router = express.Router();
const User = require('../../models/User');

/* GET /users */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

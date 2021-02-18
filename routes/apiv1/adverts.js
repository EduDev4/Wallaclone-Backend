const express = require('express');

const router = express.Router();
const Advert = require('../../models/Advert');

/* GET /adverts */
router.get('/', async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.json(adverts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

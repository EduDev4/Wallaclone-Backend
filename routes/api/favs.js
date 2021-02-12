var express = require('express');
var router = express.Router();
const Fav = require('../../models/Fav');

/* GET /favs */
router.get('/', async function (req, res, next) {
  try {
    const favs = await Fav.find();
    res.json(favs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

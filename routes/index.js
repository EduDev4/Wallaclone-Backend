const express = require('express');

const router = express.Router();

/* GET home page, API documentation. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.redirect('/apidoc');
});

module.exports = router;

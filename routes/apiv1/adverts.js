const express = require('express');

// import functions from controller
const { getAllAdverts } = require('../../controllers/advertController');

const router = express.Router();

router.route('/').get(getAllAdverts);

module.exports = router;

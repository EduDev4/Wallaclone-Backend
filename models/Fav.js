'use strict';

const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  advertId: {
    type: String,
    index: true,
  },
});

const Fav = mongoose.model('Fav', favSchema);

module.exports = Fav;

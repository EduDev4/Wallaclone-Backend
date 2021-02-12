'use strict';

const mongoose = require('mongoose');

const advertSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  sale: {
    type: Boolean,
    default: true,
    index: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  tags: {
    type: [String],
    index: true,
  },
  author: {
    type: String,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  booked: {
    type: Boolean,
    default: false,
    index: true,
  },
});

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;

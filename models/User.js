'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  passwd: {
    type: String,
  },
});

userSchema.statics.hashPassword = function (clearPass) {
  return bcrypt.hash(clearPass, 8);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

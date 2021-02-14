const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      required: [true, 'Please add a username'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      required: [true, 'Please provide an email'],
    },
    passwd: {
      type: String,
      minlength: 6,
      select: false,
      required: [true, 'Please provide a password'],
    },

    // TODO: próxima reunión comentar/explicar esto de los favoritos
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Advert' }],
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.hashPassword = function (clearPass) {
  return bcrypt.hash(clearPass, 8);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

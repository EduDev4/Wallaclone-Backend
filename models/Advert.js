const mongoose = require('mongoose');

const advertSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An advert must have a name'],
      index: true,
    },
    sale: {
      type: Boolean,
      default: true,
      index: true,
    },
    price: {
      type: Number,
      required: [true, 'An advert must have a price'],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'An advert must have an image'],
    },
    tags: {
      type: [String],
      index: true,
      enum: {
        values: ['mobile', 'work', 'lifestyle', 'motor'],
        message: 'Tags can be: mobile, work, lifestyle, motor',
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    state: {
      type: String,
      default: 'Available',
      enum: {
        values: ['Available', 'Reserved', 'Sold'],
        message: '{VALUE} it is not a valid state',
      },
      index: true,
    },
  },
  { timestamps: true },
);

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;

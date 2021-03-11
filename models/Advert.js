const mongoose = require('mongoose');
const { tagsObjModel } = require('../utils/config');

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
      default: '',
    },
    thumb: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      index: true,
      enum: tagsObjModel,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isFavBy: {
      type: Map,
      of: Boolean,
      default: {},
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

advertSchema.statics.allowedTags = function () {
  return tagsObjModel.values;
};

advertSchema.statics.listAdverts = function (
  filterObj,
  sortBy,
  fields,
  limit,
  skip,
) {
  const query = this.find(filterObj)
    .populate('createdBy', 'username')
    .collation({ locale: 'es' })
    .sort(sortBy)
    .select(fields)
    .limit(limit)
    .skip(skip)
    .populate('createdBy', 'username');

  return query;
};

const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert;

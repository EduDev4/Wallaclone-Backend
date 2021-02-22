const createError = require('http-errors');
const Advert = require('../models/Advert');
const { getFilterObj } = require('../utils/apiFilter');

const getAllAdverts = async (req, res, next) => {
  try {
    const filterObj = getFilterObj(req.query);

    const sortBy = req.query.sort
      ? req.query.sort.split(',').join(' ')
      : 'createdAt';

    const fields = req.query.fields
      ? req.query.fields.split(',').join(' ')
      : '-__v';

    const start = req.query.start * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (start - 1) * limit;

    const adverts = await Advert.listAdverts(
      filterObj,
      sortBy,
      fields,
      limit,
      skip,
    );

    console.log(adverts);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: adverts.length,
      data: {
        adverts: adverts,
      },
    });
  } catch (err) {
    next(createError(404, err));
  }
};

module.exports = {
  getAllAdverts,
};

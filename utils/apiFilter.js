exports.getFilterObj = function (queryString) {
  // Obtain query object from query string
  const filterObj = { ...queryString };

  // Delete properties that not use for filter
  const excludedFields = ['start', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete filterObj[el]);

  // Apply price range filter if exists, supose the string is
  // in right format
  // ?price=10-50
  if (filterObj.price && filterObj.price.includes('-')) {
    if (filterObj.price[0] === '-') {
      // (?price=-50) Filter by price <= 50
      filterObj.price = {
        $lte: parseInt(filterObj.price.replace('-', ''), 10),
      };
    } else if (filterObj.price[filterObj.price.length - 1] === '-') {
      // (?price=50-) Filter by price >= 50
      filterObj.price = {
        $gte: parseInt(filterObj.price.replace('-', ''), 10),
      };
    } else {
      // (?price=50-100) Filter by 50 <= price <=100
      filterObj.price = {
        $gte: parseInt(
          filterObj.price.substring(0, filterObj.price.indexOf('-')),
          10,
        ),
        $lte: parseInt(
          filterObj.price.substring(
            filterObj.price.indexOf('-') + 1,
            filterObj.price.length,
          ),
          10,
        ),
      };
    }
  }

  // Apply filter name, use regular expression from mongodb
  if (filterObj.name) {
    filterObj.name = { $regex: `^${filterObj.name}`, $options: 'i' };
  }

  // If there are "tags" in queryString (?tags=mobile,work),
  // make new valid mongodb search object, tags = { $all: ['mobile','work'] }
  if (filterObj.tags) {
    if (filterObj.tags === 'all') {
      delete filterObj.tags;
    } else {
      filterObj.tags = { $all: filterObj.tags.split(',') };
    }
  }

  return filterObj;
};

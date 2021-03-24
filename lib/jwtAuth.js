const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// returns jwt authentication

module.exports = function () {
  return (req, res, next) => {
    // get the token on the header
    const tokenJWT = (req.get('Authorization') || '').split(' ')[1];

    // if there is no token
    if (!tokenJWT) {
      return next(createError(401, 'No token provided'));
    }

    // verify the token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, tokenContent) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return next(createError(401, 'Token has expired!'));
        }

        return next(createError(401, 'Invalid token!'));
      }

      // take de user _id in case we need to know whitch user it is
      req.userId = tokenContent._id;

      next();
    });
  };
};

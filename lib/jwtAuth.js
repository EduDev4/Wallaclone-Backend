'use strict';

const jwt = require('jsonwebtoken');

// returns jwt authentication

module.exports = function () {
  return (req, res, next) => {
    // get the token on the header or the query string
    const tokenJWT = req.get('Authorization') || req.query.token;

    // if there is no token
    if (!tokenJWT) {
      res.status(401).json({
        status: 'fail',
        requestedAt: req.requestTime,
        message: 'No token provided',
      });
      return;
    }

    // verify the token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, tokenContent) => {
      if (err) {
        if (err.name == 'TokenExpiredError') {
          //const error = new Error('Token has expired');
          //error.status = 401;
          //next(error);
          res.status(401).json({
            status: 'fail',
            requestedAt: req.requestTime,
            message: 'Token has expired',
          });
          return;
        }

        return next(err);
      }

      // take de user _id in case we need to know whitch user it is
      req.userId = tokenContent._id;

      next();
    });
  };
};

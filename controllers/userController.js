'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  /**
   * GET /login
   */
  index(req, res, next) {
    res.send('ok');
  }
  /**
   * POST /login
   */
  async login(req, res, next) {
    try {
      const username = req.body.username;
      const passwd = req.body.passwd;

      const user = await User.findOne({ username: username }).select('+passwd');

      if (!user || !(await bcrypt.compare(passwd, user.passwd))) {
        // TODO comprobar si la respuesta está bien hecha
        res.status(401).json({
          status: 'fail',
          requestedAt: req.requestTime,
          message: 'Invalid credentials',
        });
        // TODO crear error con new Error a next

        return;
      }

      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d',
        },
        (err, tokenJWT) => {
          if (err) return next(err);

          res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
              tokenJWT: tokenJWT,
              username: username,
              userEmail: user.email,
            },
          });
        },
      );
    } catch (error) {
      console.log('error:', error);
      next(error);
    }
  }
}

module.exports = new UserController();

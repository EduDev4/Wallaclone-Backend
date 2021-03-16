const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const createError = require('http-errors');
const User = require('../models/User');
const Advert = require('../models/Advert');

const {
  sendResetPasswordEmail,
  sendConfirmationEmail,
  sendUnsubscribeEmail,
} = require('./mailerController');

// COMPLETE: Poner o quitar favoritos
// TODO: Actualización de datos de usuario

class UserController {
  /**
   * POST /login
   */
  async login(req, res, next) {
    try {
      const { username } = req.body;
      const { passwd } = req.body;
      // console.log(req.body);

      const user = await User.findOne({
        username: username,
        confirmed: true,
      }).select('+passwd');

      if (!user || !(await bcrypt.compare(passwd, user.passwd))) {
        return next(createError(401, 'Invalid credentials!'));
        // COMPLETE crear error con new Error a next
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
              _id: user._id,
            },
          });
        },
      );
    } catch (error) {
      console.log('error:', error);
      next(createError(401, error.message));
    }
  }

  /**
   * POST /   (Singup)
   */
  async signup(req, res, next) {
    try {
      const newuser = new User(req.body);

      newuser.passwd = await User.hashPassword(newuser.passwd);

      User.findOne(
        {
          $or: [{ email: newuser.email }, { username: newuser.username }],
        },
        (err, user) => {
          //Si ya hay usuario con ese email o username
          if (user) {
            //Si el usuario esta confirmado o pendiente de confirmar
            if (user.confirmed || Date.now() < user.expires)
              return next(createError(400, 'email or username already exits'));
            // return res.status(400).json({
            //   auth: false,
            //   message: 'email or username already exits',
            // });

            //Sino, Borramos el usuario cuyo token expiró y no está confirmado
            try {
              user.remove();
            } catch (error) {
              console.log(error);
              return next(createError(400, error.message));
            }
          }

          //Si el usuario no existe en la BD directamente lo creamos

          newuser.token = crypto
            .createHash('md5')
            .update(Math.random().toString().substring(2))
            .digest('hex');

          // eslint-disable-next-line no-shadow
          newuser.save((err, doc) => {
            if (err) {
              console.log(err);
              // COMPLETE Usar createError
              return next(createError(400, err.message));
            }
            // TODO enviar email al usuario con el enlace para confirmar:
            // TODO ej: http://localhost:3000/apiv1/users/confirm/03a1ad862e706f3aabc3cf234a02e1cd
            // res.status(200).json({
            //   succes: true,
            //   user: doc,
            // });
            // COMPLETE: Respuesta unificada del user signup
            res.status(200).json({
              status: 'success',
              requestedAt: req.requestTime,
              data: {
                user: doc,
              },
            });
          });
        },
      );
    } catch (error) {
      console.log(error);
      return next(createError(400, error.message));
    }
  }

  /**
   * GET /confirm/:token   (Singup confirmation)
   */
  async signupConfirmation(req, res, next) {
    const { token } = req.params;

    try {
      if (!token) {
        return next(createError(401, 'Token missing!'));
      }

      const user = await User.findOne({ token: token });

      if (!user) {
        return next(createError(401, 'The token provided is not valid!'));
      }

      if (Date.now() > user.expires) {
        await user.remove();
        return next(createError(401, 'Token expired!'));
      }

      user.confirmed = true;
      user.token = '';
      user.expires = '';
      await user.save();

      // return res
      //   .status(200)
      //   .json({ succes: true, message: 'User email confirmed' });
      // COMPLETE: Respuesta unificada del user signup confirmation
      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          message: 'User email confirmed',
        },
      });
    } catch (err) {
      console.log(err);
      // COMPLETE usar error handler
      return next(createError(400, err.message));
    }
  }

  /**
   * PUT /forgotPass
   */
  async forgotPass(req, res, next) {
    const { email } = req.body;
    try {
      const user = await User.find({ email });
      if (!user) {
        return next(createError(422, "User email doesn't exist!"));
      }
      const hash = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      const obj = {
        hash: hash,
      };
      const newUser = _.extend(...user, obj);
      await newUser.save();
      await sendResetPasswordEmail({ toUser: email }, hash);

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          message: 'Please check your email in order to reset the password!',
        },
      });
    } catch (err) {
      return next(createError(422, err.message));
    }
  }

  /**
   * POST /forgotPass/confirmation
   */
  async forgotPassConfirm(req, res, next) {
    const { passwd, hash } = req.body;
    const user = await User.find({ hash });
    const { email } = user[0];

    try {
      const obj = {
        passwd: await User.hashPassword(passwd),
        hash: hash,
      };
      const newUser = _.extend(...user, obj);
      await newUser.save();
      await sendConfirmationEmail({ toUser: email });

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          message: 'Password has been resseted',
        },
      });
    } catch (err) {
      return next(createError(422, err.message));
    }
  }

  /**
   * DELETE /   (Delete user)
   */
  async deleteUser(req, res, next) {
    try {
      const { email } = await User.findOne({ _id: req.userId });

      if (!email) return next(createError(404, 'User not found!'));

      await User.deleteOne({ _id: req.userId });

      //COMPLETE: Enviar email de confirmación de baja
      await sendUnsubscribeEmail({ toUser: email });

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      return next(createError(422, err.message));
    }
  }

  /**
   * PATCH /editUser/:username
   */
  async updateUserData(req, res, next) {
    const { newUsername, newUserEmail, newPasswd } = req.body;
    const currentUsername = req.params.username;

    try {
      const currentUser = await User.findOne({
        username: currentUsername,
      });
      const newData = {};

      if (newUsername) {
        if (await (await User.find({ username: newUsername })).length) {
          return next(createError(422, 'This username is already in use'));
        }
        newData.username = newUsername;
      }

      if (newUserEmail) {
        if (await (await User.find({ email: newUserEmail })).length) {
          return next(createError(422, 'This email is already in use'));
        }
        newData.email = newUserEmail;
      }

      if (newPasswd) {
        newData.passwd = await User.hashPassword(newPasswd);
      }

      const newUserData = await User.findOneAndUpdate(
        { _id: currentUser._id },
        newData,
        {
          new: true,
          useFindAndModify: false,
        },
      );

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          username: newUserData.username,
          userEmail: newUserData.email,
        },
      });
    } catch (error) {
      return next(createError(404, error.message));
    }
  }

  /**
   * POST /favs/:adId   (Set or Unset favorite)
   */
  async setUnsetFav(req, res, next) {
    try {
      const advert = await Advert.findById(req.params.adId);
      let message;
      User.findOne({ _id: req.userId })
        .then(user => {
          if (user.favorites.includes(req.params.adId)) {
            user.favorites = user.favorites.filter(
              id => id.toString() !== req.params.adId,
            );
            advert.isFavBy.set(req.userId, false);
            message = 'Fav deleted!';
          } else {
            user.favorites.push(req.params.adId);
            advert.isFavBy.set(req.userId, true);
            message = 'Fav created!';
          }

          advert.save();
          user.save();
          res.status(200).json({
            status: 'success',
            data: {
              advert: advert,
              message: req.__(message),
            },
          });
        })
        .catch(err => next(createError(404, err.message)));
    } catch (err) {
      return next(createError(404, err.message));
    }
  }

  /**
   * GET /favs   (Get all user favorites)
   */
  async getUserFavs(req, res, next) {
    try {
      const { favorites } = await User.findOne({ _id: req.userId });

      const adverts = await Advert.find({ _id: { $in: favorites } }).populate(
        'createdBy',
        'username',
      );

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          results: adverts.length,
          adverts: adverts,
        },
      });
    } catch (err) {
      return next(createError(404, err.message));
    }
  }

  async setUnsetSold(req, res, next) {
    try {
      const advert = await Advert.findById(req.params.adId);
      let message;

      if (!advert) {
        return next(createError(404, 'Advert not found!'));
      }

      if (advert.createdBy.toString() !== req.userId) {
        return next(createError(401, 'Unauthorized Request!!'));
      }

      if (advert.state === 'Available' || advert.state === 'Reserved') {
        advert.state = 'Sold';

        message = 'Advert sold!';
        // TODO: Enviar notificación a usuarios como vendido
      } else {
        advert.state = 'Available';

        message = 'Advert available!';
        // TODO: Enviar notificación a usuarios como disponible
      }

      advert.save();

      res.status(200).json({
        status: 'success',
        data: {
          adStatus: advert.state,
          message: req.__(message),
        },
      });
    } catch (err) {
      return next(createError(404, err.message));
    }
  }

  /**
   * GET /sold   (Get all user sold ones)
   */
  async getUserSold(req, res, next) {
    try {
      const adverts = await Advert.find({
        createdBy: req.userId,
        state: 'Sold',
      }).populate('createdBy', 'username');

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          results: adverts.length,
          adverts: adverts,
        },
      });
    } catch (err) {
      return next(createError(404, err.message));
    }
  }

  /**
   * GET /:id (Get username from userId)
   */
  async getUserNameFromId(req, res, next) {
    try {
      const { username } = await User.findById(req.params.id);

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          username,
        },
      });
    } catch (error) {
      return next(createError(404, error.message));
    }
  }

  /**
   * POST /reservation/:adId   (Set or Unset reserved)
   */
  async setUnsetReserved(req, res, next) {
    try {
      const advert = await Advert.findById(req.params.adId);
      let message;

      if (!advert) {
        return next(createError(404, 'Advert not found!'));
      }

      if (advert.createdBy.toString() !== req.userId) {
        return next(createError(401, 'Unauthorized Request!!'));
      }

      if (advert.state === 'Sold') {
        return next(createError(400, 'Advert is sold, uncheck first!'));
      }

      if (advert.state === 'Available') {
        advert.state = 'Reserved';
        message = 'Advert reserved!';
        // TODO: Enviar notificación a usuarios como reservado
      } else {
        advert.state = 'Available';
        message = 'Advert available!';
        // TODO: Enviar notificación a usuarios como disponible
      }

      advert.save();
      // console.log(advert);

      res.status(200).json({
        status: 'success',
        data: {
          adStatus: advert.state,
          message: req.__(message),
        },
      });
    } catch (err) {
      return next(createError(404, err.message));
    }
  }

  /**
   * GET /reserved   (Get all user reserved ones)
   */
  async getUserReserved(req, res, next) {
    try {
      const adverts = await Advert.find({
        createdBy: req.userId,
        state: 'Reserved',
      }).populate('createdBy', 'username');

      res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
          results: adverts.length,
          adverts: adverts,
        },
      });
    } catch (err) {
      return next(createError(404, err.message));
    }
  }
}

module.exports = new UserController();

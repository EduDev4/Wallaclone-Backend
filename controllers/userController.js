const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

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
      const { username } = req.body;
      const { passwd } = req.body;
      console.log(req.body);
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
              return res.status(400).json({
                auth: false,
                message: 'email or username already exits',
              });
            //Sino, Borramos el usuario cuyo token expiró y no está confirmado
            try {
              user.remove();
            } catch (error) {
              console.log(error);
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
              // TODO Usar createError
              return res.status(400).json({ success: false });
            }
            // TODO enviar email al usuario con el enlace para confirmar:
            // TODO ej: http://localhost:3000/apiv1/users/confirm/03a1ad862e706f3aabc3cf234a02e1cd
            res.status(200).json({
              succes: true,
              user: doc,
            });
          });
        },
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * GET /confirm/:token   (Singup confirmation)
   */
  async signupConfirmation(req, res, next) {
    const { token } = req.params;

    try {
      if (!token) {
        return res.status(404).json({
          succes: false,
          message: 'Token missing',
        });
      }

      const user = await User.findOne({ token: token });

      if (!user) {
        return res.status(404).json({
          succes: false,
          message: 'The token provided is not valid',
        });
      }

      if (Date.now() > user.expires) {
        await user.remove();
        return res.status(200).json({ error: 'token expired' });
      }

      user.confirmed = true;
      user.token = '';
      user.expires = '';
      await user.save();

      return res
        .status(200)
        .json({ succes: true, message: 'User email confirmed' });
    } catch (err) {
      console.log(err);
      // TODO usar error handler
      return res.status(404).json({ error: err });
    }
  }
}

module.exports = new UserController();

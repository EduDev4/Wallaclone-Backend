const Notification = require('../models/Notification');
const createError = require('http-errors');
const queue = require('../lib/queue');

const queueNotification = (text, user) => {
  const notification = {
    text: text,
    user: user,
  };
  queue.send('incoming', notification).then(() => null);
};
const createNotification = (req, res, next) => {
  try {
    const user = req.userId;
    const text = req.body.text;
    console.log(user);
    console.log(req.body.text);
    /* const { _id } = await Notification.create({
      text: text,
      user: user,
    }); */

    queue
      .send('incoming', { text, user })
      .then(() => {
        res.end('Received ' + JSON.stringify(message));
      })
      .catch(e => {
        console.error(e);
        res.status(500);
        res.end(e.message);
      });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        text: text,
        user: user,
      },
    });
  } catch (err) {
    next(createError(404, err.message));
  }
};

module.exports = {
  createNotification,
};

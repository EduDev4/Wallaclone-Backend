const { Router } = require('express');

const router = Router();

const webpush = require('../webpush');

let pushSubscripton;

router.post('/subscription', async (req, res) => {
  pushSubscripton = req.body;
  console.log(pushSubscripton);

  // Server's Response
  res.status(201).json();
});

function sendNotify() {
  router.post('/new-message', async (req, res) => {
    console.log(req.body);
    const { msg } = req.body;
    // Payload Notification
    const payload = JSON.stringify({
      title: 'My Custom Notification',
      msg,
    });
    res.status(200).json();
    try {
      await webpush.sendNotification(pushSubscripton, payload);
    } catch (error) {
      console.log(error);
    }
  });
}

/* GET home page, API documentation. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.redirect('/apidoc');
});

exports.sendNotyfy = sendNotify;
module.exports = router;

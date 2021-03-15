const queue = require('../lib/queue');
const Notification = require('../models/Notification');

const handleIncoming = notification =>
  Notification.create(notification).then(record => {
    console.log('Saved ' + JSON.stringify(record));
  });

queue.receive('incoming', handleIncoming).catch(console.error);

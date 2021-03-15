const { at } = require('lodash');
const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'A message is required'],
      index: true,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model('Notification', notificationSchema);

notificationSchema.statics.create = attrs => new Notification(attrs).save();

notificationSchema.statics.list = filterObj =>
  Notification.find(filterObj)
    .populate('user', 'username')
    .then(notifications => notifications.slice().reverse());

module.exports = Notification;

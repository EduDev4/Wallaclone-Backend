const mongoose = require('mongoose');

const databaseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.MONGODB_CONNECTION_STRING_LOCAL
    : process.env.MONGODB_CONNECTION_STRING_PRODUCTION;

mongoose.connection.on('open', () => {
  console.log('Connect to MongoDB on', mongoose.connection.name);
});

mongoose.connection.on('error', error => {
  console.log('Connection error ', error);
  process.exit(1);
});

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;

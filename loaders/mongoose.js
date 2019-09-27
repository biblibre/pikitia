const config = require('config');
const mongoose = require('mongoose');

const uri = config.get('mongodb.uri');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
function successHandler () {
  console.log(`Connected to ${uri}`);
}
function errorHandler (err) {
  console.log('Connection to ' + uri + ' failed: ' + String(err));
  console.log('Retrying in 5 seconds');
  setTimeout(function () {
    mongoose.connection.openUri(uri, options).then(successHandler, errorHandler);
  }, 5000);
}
mongoose.connect(uri, options).then(successHandler, errorHandler);

require('../models/client');
require('../models/token');

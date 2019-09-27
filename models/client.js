const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  client_id: String,
  client_secret: String,
});

module.exports = mongoose.model('Client', schema);

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  accessToken: String,
  accessTokenExpiresAt: Date,
});

schema.index({ accessTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Token', schema);

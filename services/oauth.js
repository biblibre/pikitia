const OAuth2Server = require('oauth2-server');
const mongoose = require('mongoose');

const oauth = new OAuth2Server({
  model: {
    getClient,
    getUserFromClient,
    saveToken,
    getAccessToken,
  },
});

module.exports = oauth;

async function getClient(clientId, clientSecret) {
  const Client = mongoose.model('Client');
  const conditions = { client_id: clientId, client_secret: clientSecret };
  const client = await Client.findOne(conditions);
  if (client) {
    return {
      id: client.client_id,
      grants: ['client_credentials'],
    };
  }
}

async function getUserFromClient() {
  return {};
}

async function saveToken(token, client) {
  const Client = mongoose.model('Client');
  const Token = mongoose.model('Token');

  const conditions = { client_id: client.id };
  const c = await Client.findOne(conditions);

  if (c) {
    const t = await Token.create({
      client: c._id,
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
    });

    if (t) {
      return {
        accessToken: t.accessToken,
        accessTokenExpiresAt: t.accessTokenExpiresAt,
        client: {
          id: c._id,
        },
        user: {},
      };
    }
  }
}

async function getAccessToken(accessToken) {
  const Token = mongoose.model('Token');
  const conditions = { accessToken: accessToken };
  const token = await Token.findOne(conditions).populate('client');
  if (token) {
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: {
        id: token.client.client_id,
      },
      user: {},
    };
  }
}

const { Request, Response } = require('oauth2-server');
const oauth = require('../services/oauth');

function authenticate (options) {
  return function (req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    return oauth.authenticate(request, response, options)
      .then(function() {
        next();
      })
      .catch(function(err) {
        console.log(err.message);
        res.sendStatus(401);
      });
  }
}

module.exports = authenticate;

const { Request, Response } = require('oauth2-server');
const bodyParser = require('body-parser');
const oauth = require('../services/oauth');

module.exports = function (app) {
  app.post('/oauth/token', bodyParser.urlencoded({ extended: false }), function (req, res, next) {
    const request = new Request(req);
    const response = new Response(res);

    oauth.token(request, response)
      .then(() => {
        res.set(response.headers);
        res.status(response.status).send(response.body);
      })
      .catch((err) => {
        next(err);
      });
  });
};

const bodyParser = require('body-parser');
const pikitia = require('../services/pikitia');
const authenticate = require('../middlewares/authenticate');

module.exports = function (app) {
  app.post('/pdf', authenticate(), bodyParser.json(), async function(req, res, next) {
    try {
      const options = {
        cookies: req.body.cookies,
        viewport: req.body.viewport,
      };
      const buffer = await pikitia.pdf(req.body.url, options);

      res.set('Content-Type', 'application/pdf');
      res.status(200).send(buffer);
    } catch (err) {
      next(err);
    }
  });
};

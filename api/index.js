module.exports = function (app) {
  require('./oauth')(app);
  require('./screenshot')(app);
  require('./pdf')(app);
}

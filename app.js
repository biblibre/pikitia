const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

app.use(cookieParser());
app.use(morgan('short'));

require('./loaders/mongoose');
require('./api')(app);

module.exports = app;

'use strict';

const app = require('./app');
const port = 'PORT' in process.env ? process.env.PORT : 3000;

console.log('Listening on port:', port);

app.listen(port);

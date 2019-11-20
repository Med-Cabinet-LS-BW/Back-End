const express = require('express');
const configureMiddleware = require('./configure.middleware.js');
const apiRouter = require('./api.router.js');
const { executeOnceEveryDayAtMidnight } = require('../strains/strains.crons.js');
const { getAndInsertStrains } = require('../strains/strains.helpers.js');

const server = express();

configureMiddleware(server);

function enableAllOrigins(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}
if (process.env.DB_ENV === 'production') {
  executeOnceEveryDayAtMidnight(getAndInsertStrains);
}

server.use('/api', enableAllOrigins, apiRouter);

module.exports = server;

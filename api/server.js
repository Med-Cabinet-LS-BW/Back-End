const express = require('express');
const configureMiddleware = require('./configure.middleware.js');
const apiRouter = require('./api.router.js');

const server = express();

configureMiddleware(server);

function enableAllOrigins(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}

server.use('/api', enableAllOrigins, apiRouter);

module.exports = server;

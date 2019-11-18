const json = require('express').json;
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(helmet());
  server.options('*', cors());
  server.use(json());
};

const rateLimit = require('express-rate-limit');

const createGameLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 minutes
  max: 25, // limit each IP to 100 requests per windowMs
  message: 'Too many request, please try again later',
});

const joinGameLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  message: 'Too many request, please try again later',
});

module.exports = {
  createGameLimit,
  joinGameLimit,
};

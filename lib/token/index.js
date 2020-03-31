const { sign, verify } = require('jsonwebtoken');
const { errorFactory, CustomErrorTypes } = require('error-handler-module');

const forbiddenError = errorFactory(CustomErrorTypes.FORBIDDEN);

const jwt = secret => {
  const signToken = (payload, options = {}) => sign(payload, secret, options);

  const verifyToken = async (payload, options = {}) => {
    try {
      return verify(payload, secret, options);
    } catch (err) {
      throw forbiddenError(err.message, err.extra);
    }
  };

  return { signToken, verifyToken };
};

module.exports = jwt;

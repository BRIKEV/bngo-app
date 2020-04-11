const {
  errorFactory,
  CustomErrorTypes,
} = require('error-handler-module');
const axios = require('axios');

const notFoundError = errorFactory(CustomErrorTypes.NOT_FOUND);

module.exports = () => {
  const start = async ({ config }) => {
    const createURL = (type, name) => (
      `${config.imgURL}/${type}/${name}`
    );

    const handleImage = (type, name) => {
      if (!type || !name) {
        throw notFoundError('type and name must be required');
      }
      const url = createURL(type, name);
      return axios({
        method: 'get',
        url,
        responseType: 'stream',
      });
    };

    return { handleImage };
  };

  return { start };
};

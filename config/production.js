const { join } = require('path');

module.exports = {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  routes: {
    api: {
      frontMainFile: join(__dirname, '..', 'frontend', 'dist', 'index.html'),
    },
    admin: {
      frontPath: join(__dirname, '..', 'frontend', 'dist'),
    },
  },
};

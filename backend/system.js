const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'bngo-app-backend' })
  .bootstrap(join(__dirname, 'components'));

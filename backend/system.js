const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'bngo-app' })
  .bootstrap(join(__dirname, 'components'));

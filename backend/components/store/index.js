const System = require('systemic');
const initExpress = require('./initStore');

module.exports = new System({ name: 'store' })
  .add('store', initExpress()).dependsOn('config', 'logger');

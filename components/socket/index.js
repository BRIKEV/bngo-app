const System = require('systemic');
const initExpress = require('./initSocket');

module.exports = new System({ name: 'io' })
  .add('io', initExpress()).dependsOn('config', 'logger', 'controller', 'server');

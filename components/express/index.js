const System = require('systemic');
const initExpress = require('./initExpress');

module.exports = new System({ name: 'express' })
  .add('server', initExpress()).dependsOn('config', 'logger');

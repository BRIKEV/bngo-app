const System = require('systemic');
const initExpress = require('./initController');

module.exports = new System({ name: 'controller' })
  .add('controller', initExpress()).dependsOn('config', 'logger', 'store');

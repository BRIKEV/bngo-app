const System = require('systemic');
const initExpress = require('./initController');
const imageController = require('./imageController');

module.exports = new System({ name: 'controller' })
  .add('controller', initExpress()).dependsOn('config', 'logger', 'store')
  .add('imageController', imageController())
  .dependsOn('config');

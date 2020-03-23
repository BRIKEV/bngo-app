const System = require('systemic');
const adminRoutes = require('./admin-routes');

module.exports = new System({ name: 'routes' })
  .add('routes.admin', adminRoutes())
  .dependsOn('config', 'logger', 'server', 'middleware.prepper', 'manifest')
  .add('routes')
  .dependsOn('routes.admin');

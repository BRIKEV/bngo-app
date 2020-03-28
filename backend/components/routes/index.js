const System = require('systemic');
const adminRoutes = require('./admin-routes');
const apiRoutes = require('./api-routes');

module.exports = new System({ name: 'routes' })
  .add('routes.admin', adminRoutes())
  .dependsOn('config', 'logger', 'server', 'middleware.prepper', 'manifest')
  .add('routes.api', apiRoutes())
  .dependsOn('logger', 'server', 'middleware.prepper')
  .add('routes')
  .dependsOn('routes.admin', 'routes.api');

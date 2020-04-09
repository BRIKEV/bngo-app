const System = require('systemic');
const initLocalStore = require('./initStore');
const initRedisStore = require('./initRedisStore');

module.exports = new System({ name: 'store' })
  .add('store.local', initLocalStore()).dependsOn('config', 'logger')
  .add('store.redis', initRedisStore())
  .dependsOn('config', 'logger')
  .add('store')
  .dependsOn({
    component: 'store.local',
    destination: 'local',
  }, {
    component: 'store.redis',
    destination: 'redis',
  });

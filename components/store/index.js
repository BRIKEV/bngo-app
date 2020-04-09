const System = require('systemic');
const initLocalStore = require('./initStore');

module.exports = new System({ name: 'store' })
  .add('store.local', initLocalStore()).dependsOn('config', 'logger')
  .add('store')
  .dependsOn({
    component: 'store.local',
    destination: 'local',
  });

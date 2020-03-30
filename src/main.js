import Vue from 'vue';
import i18n from '@/lang/i18n';
import { VueSpinners } from '@saeris/vue-spinners';
import VueNotification from 'vue-notification';
import App from './App.vue';
import '@/components/registerAsGlobal';
import router from './router';
import store from './store';
import '@/theme/normalize.scss';
import '@/theme/index.scss';

Vue.config.productionTip = false;

Vue.use(VueSpinners);

Vue.use(VueNotification, {
  componentName: 'VueNotification',
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

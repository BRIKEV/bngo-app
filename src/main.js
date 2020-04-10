import Vue from 'vue';
import i18n from '@/lang/i18n';
import { VueSpinners } from '@saeris/vue-spinners';
import VueNotification from 'vue-notification';
import Vuelidate from 'vuelidate';
import VueAnalytics from 'vue-analytics';
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
Vue.use(Vuelidate);

const isProd = process.env.NODE_ENV === 'production';

Vue.use(VueAnalytics, {
  id: 'UA-163340564-1',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd,
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

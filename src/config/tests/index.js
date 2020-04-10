// eslint-disable-next-line import/no-extraneous-dependencies
import { createLocalVue } from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Notifications from 'vue-notification';
import { VueSpinners } from '@saeris/vue-spinners';
import Vuelidate from 'vuelidate';

import '@/theme/index.scss';

const localVue = createLocalVue();

localVue.use(VueI18n);
localVue.use(Notifications, {
  componentName: 'VueNotification',
});
localVue.use(VueSpinners);
localVue.use(Vuelidate);

export default localVue;

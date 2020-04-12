import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/lang/locales';

const DEFAULT_LANG = 'es';

Vue.use(VueI18n);

export default new VueI18n({
  messages: {
    es: messages.es,
  },
  locale: DEFAULT_LANG,
});

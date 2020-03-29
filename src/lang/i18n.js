import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './locales';

Vue.use(VueI18n);

const DEFAULT_LANG = 'es';

const i18n = new VueI18n({
  messages,
  locale: DEFAULT_LANG,
});

export default i18n;

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './locales';

Vue.use(VueI18n);

const DEFAULT_LANG = 'es';
const SECONDARY_LANG = 'en';

const navigatorLang = navigator.language;
const locale = navigatorLang.includes && navigatorLang.includes('es') ? DEFAULT_LANG : SECONDARY_LANG;

const i18n = new VueI18n({
  messages,
  locale,
});

export default i18n;

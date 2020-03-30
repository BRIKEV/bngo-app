import Vue from 'vue';
import Vuex from 'vuex';

import bgno from './bgno/bgnoStore';
import notification from './notification/notificationsStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    bgno,
    notification,
  },
});

export default store;

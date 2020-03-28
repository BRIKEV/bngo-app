import Vue from 'vue';
import Vuex from 'vuex';

import bgno from './bgno/bgnoStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    bgno,
  },
});

export default store;

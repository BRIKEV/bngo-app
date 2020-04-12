import Vuex from 'vuex';
import localVue from '@/config/tests';


localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bgno: {
      gameTypes: ['standard'],
    },
  },
});

export default store;

import persistence from '@/persistence';
import actions from './bgnoActions';

const sessionStorage = persistence('sStorage');

const persistenceResults = sessionStorage.getItem('results');

export const initialState = {
  currentResult: {
    animate: null,
    selected: {
      image: '',
      name: '',
    },
  },
  gameTypes: [],
  users: [],
  board: [],
  userBoard: [],
  user: {},
  results: persistenceResults ? JSON.parse(persistenceResults) : [],
};

export const mutations = {
  CLEAN(state) {
    Object.assign(state, initialState);
  },
  SET_BOARD(state, payload = []) {
    state.board = [...payload];
  },
  SET_USER_BOARD(state, payload = []) {
    state.userBoard = [...payload];
  },
  SET_SELECTED_RESULT(state, currentSelected = {}) {
    state.currentResult = {
      ...state.currentResult,
      selected: {
        ...state.currentResult.selected,
        ...currentSelected,
      },
    };
  },
  SET_USER_INFO(state, payload) {
    state.user = { ...state.user, ...payload };
  },
  SET_ANIMATE(state, payload) {
    state.currentResult = {
      ...state.currentResult,
      animate: payload,
    };
  },
  SET_USERS(state, payload = []) {
    state.users = [...payload];
  },
  SET_GAME_TYPES(state, payload = []) {
    state.gameTypes = [...payload];
  },
  SET_RESULTS(state, lastResult = []) {
    state.results = [
      lastResult,
      ...state.results,
    ];
    sessionStorage.setItem('results', JSON.stringify(state.results));
  },
};

export const getters = {
  total: (state) => state.board.filter(({ selected }) => !selected).length,
};

export default {
  state: {
    ...initialState,
  },
  actions,
  getters,
  mutations,
};

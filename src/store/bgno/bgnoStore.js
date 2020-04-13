import actions from './bgnoActions';

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
};

export default {
  state: {
    ...initialState,
  },
  actions,
  mutations,
};

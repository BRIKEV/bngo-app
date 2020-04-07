import actions from './bgnoActions';

export const initialState = {
  currentResult: {
    animate: null,
    selected: {
      image: null,
      name: null,
    },
  },
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
};

export default {
  state: {
    ...initialState,
  },
  actions,
  mutations,
};

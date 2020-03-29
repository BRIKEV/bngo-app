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
};

export const mutations = {
  SET_BOARD(state, payload = []) {
    state.board = [...payload];
  },
  SET_USER_BOARD(state, payload = []) {
    state.userBoard = [...payload];
  },
  SET_CURRENT_RESULT(state, currentResult = {}) {
    state.currentResult = { ...state.currentResult, ...currentResult };
  },
};

export default {
  state: {
    ...initialState,
  },
  actions,
  mutations,
};

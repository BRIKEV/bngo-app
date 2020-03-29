export default {
  userBoard({ commit }, { board }) {
    commit('SET_USER_BOARD', board);
  },
  totalBoard({ commit }, { board: totalBoard }) {
    commit('SET_BOARD', totalBoard);
  },
};

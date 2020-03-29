export default {
  userBoard({ commit }, { board }) {
    commit('SET_USER_BOARD', board);
  },
};

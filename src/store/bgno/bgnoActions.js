export default {
  userBoard({ commit }, { board }) {
    commit('SET_USER_BOARD', board);
  },
  totalBoard({ commit }, { board: totalBoard }) {
    commit('SET_BOARD', totalBoard);
  },
  optionSelected({ commit }, { optionSelected, board: updatedBoard }) {
    commit('SET_CURRENT_RESULT', optionSelected);
    commit('SET_BOARD', updatedBoard);
  },
};

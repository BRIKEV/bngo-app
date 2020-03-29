export default {
  userBoard({ commit }, { board }) {
    commit('SET_USER_BOARD', board);
  },
  totalBoard({ commit }, { board: totalBoard }) {
    commit('SET_BOARD', totalBoard);
  },
  optionSelected({ commit }, { optionSelected, board: updatedBoard }) {
    const { image, name } = optionSelected;
    commit('SET_SELECTED_RESULT', { image, name });
    commit('SET_BOARD', updatedBoard);
  },
};

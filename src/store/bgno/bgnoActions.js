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
    commit('SET_ANIMATE', false);
  },
  userInfo({ commit }, { username, ready }) {
    commit('SET_USER_INFO', { username, ready });
  },
  activateAnimate({ commit }) {
    commit('SET_ANIMATE', true);
  },
  clean({ commit }) {
    commit('CLEAN');
  },
  usersList({ commit }, { users }) {
    commit('SET_USERS', users);
  },
};

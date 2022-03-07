import { getGameTypes } from '@/api';

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
    commit('SET_RESULTS', optionSelected);
  },
  userInfo({ commit }, { username, ready, host }) {
    commit('SET_USER_INFO', { username, ready, host });
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
  async gameTypes({ commit }) {
    const { data } = await getGameTypes();
    await commit('SET_GAME_TYPES', data);
  },
};

import axios from 'axios';
import persistence from '@/persistence';
import { SESSION_RESULTS_KEY } from '@/constants';

const sessionStorage = persistence('sStorage');

export const createGame = ({ gameKey, gameName, types }) => (
  axios.post('/api/v1/game', {
    gameKey,
    gameName,
    types,
  })
);

export const joinGame = ({ gameKey, username, gameName }) => {
  sessionStorage.removeItem(SESSION_RESULTS_KEY);
  return axios.post('/api/v1/game/join', {
    gameKey,
    username,
    gameName,
  });
};

export const getGameTypes = () => axios.get('/api/v1/game-types');

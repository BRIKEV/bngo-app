import axios from 'axios';
import mock from './mockTopics';

export const createGame = ({ gameKey, gameName, types }) => (
  axios.post('/api/v1/game', {
    gameKey,
    gameName,
    types,
  })
);

export const joinGame = ({ gameKey, username, gameName }) => (
  axios.post('/api/v1/game/join', {
    gameKey,
    username,
    gameName,
  })
);

export const getGameTypes = () => Promise.resolve(mock);

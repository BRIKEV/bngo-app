import axios from 'axios';

export const createGame = ({ gameKey, gameName, types }) => (
  axios.post('/api/v1/game', {
    gameKey,
    gameName,
    types,
  })
);

export const joinAgame = ({ gameKey, username, gameName }) => (
  axios.post('/api/v1/game/join', {
    gameKey,
    username,
    gameName,
  })
);

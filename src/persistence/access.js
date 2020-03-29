import {
  COOKIE_GAME_KEY,
  COOKIE_GAME_NAME,
  COOKIE_GAME_USERNAME,
} from '@/constants';
import persistence from '.';

const cookieStorage = persistence('cookieStorage');

const setAccess = ({ gameKey, gameName, username }) => {
  cookieStorage.setItem(COOKIE_GAME_KEY, gameKey);
  cookieStorage.setItem(COOKIE_GAME_NAME, gameName);
  cookieStorage.setItem(COOKIE_GAME_USERNAME, username);
};

const logout = () => {
  cookieStorage.removeItem(COOKIE_GAME_KEY);
  cookieStorage.removeItem(COOKIE_GAME_NAME);
  cookieStorage.removeItem(COOKIE_GAME_USERNAME);
};

const getInfo = () => {
  const gameKey = cookieStorage.getItem(COOKIE_GAME_KEY);
  const gameName = cookieStorage.getItem(COOKIE_GAME_NAME);
  const username = cookieStorage.getItem(COOKIE_GAME_USERNAME);
  return {
    gameKey,
    gameName,
    username,
  };
};

const hasAccess = () => {
  const { gameKey, gameName, username } = getInfo();
  return gameKey && gameName && username;
};

export {
  setAccess,
  logout,
  hasAccess,
  getInfo,
};

import { COOKIE_GAME_KEY } from '@/constants';
import persistence from '.';

const cookieStorage = persistence('cookieStorage');

const setAccess = (accessKey) => {
  cookieStorage.setItem(COOKIE_GAME_KEY, accessKey);
};

const logout = (route = '/') => {
  cookieStorage.removeItem(COOKIE_GAME_KEY);
  window.location.href = route;
};

const getInfo = () => {
  const accessKey = cookieStorage.getItem(COOKIE_GAME_KEY);
  return {
    accessKey,
  };
};

const hasAccess = () => {
  const { accessKey } = getInfo();
  return !!accessKey;
};

export {
  setAccess,
  logout,
  hasAccess,
  getInfo,
};

import Cookies from 'js-cookie';
import {
  cookieOptions,
  NOT_VALID_VALUES,
} from '../constants';

const validStorageValue = (value, cb) => {
  if (NOT_VALID_VALUES.includes(value)) return;
  cb();
};

const lStorage = {
  setItem: (key, value) => {
    validStorageValue(value, () => {
      localStorage.setItem(key, value);
    });
  },
  getItem: (key) => localStorage.getItem(key) || '',
  removeItem: (key) => localStorage.removeItem(key),
};

const sStorage = {
  setItem: (key, value) => {
    validStorageValue(value, () => {
      sessionStorage.setItem(key, value);
    });
  },
  getItem: (key) => sessionStorage.getItem(key) || '',
  removeItem: (key) => sessionStorage.removeItem(key),
};

const options = cookieOptions();

const cookieStorage = {
  setItem: (key, value) => {
    validStorageValue(value, () => {
      Cookies.set(key, value, options);
    });
  },
  getItem: (key) => Cookies.get(key, options) || '',
  removeItem: (key) => Cookies.remove(key, options),
};

const storage = (type = 'lStorage') => {
  const types = {
    lStorage,
    cookieStorage,
    sStorage,
  };
  if (typeof (Storage) !== 'undefined') {
    return types[type];
  }
  return type.cookieStorage;
};

export default storage;

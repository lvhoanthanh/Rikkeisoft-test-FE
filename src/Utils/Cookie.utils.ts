import Cookies from 'js-cookie';

import { COOKIE_KEYS } from '@constants';
const saveConfig = {
  expires: 30,
  path: '/',
};

const saveToken = (token: string) => {
  Cookies.set(COOKIE_KEYS.SAVED_SECURE_TOKEN, token, saveConfig);
};

const getSavedToken = () => {
  const token = Cookies.get(COOKIE_KEYS.SAVED_SECURE_TOKEN);
  if (token) return token;
  return null;
};

const saveRefreshToken = (token: string) => {
  Cookies.set(COOKIE_KEYS.SAVED_SECURE_REFRESH_TOKEN, token, saveConfig);
};

const getSavedRefreshToken = () => {
  return Cookies.get(COOKIE_KEYS.SAVED_SECURE_REFRESH_TOKEN);
};

const getSavedUserData = () => {
  const userData = localStorage.getItem(COOKIE_KEYS.SAVED_USER_DATA);
  if (userData && userData !== 'undefined') return JSON.parse(userData);
  return null;
};

const saveUserData = (userData: any) => {
  localStorage.setItem(COOKIE_KEYS.SAVED_USER_DATA, JSON.stringify(userData));
};

const saveUserRole = (role: string) => {
  Cookies.set(COOKIE_KEYS.ROLE_KEY, role, saveConfig);
};

const getUserRole = () => {
  return Cookies.get(COOKIE_KEYS.ROLE_KEY);
};


const clearAllSavedData = () => {
  Cookies.remove(COOKIE_KEYS.SAVED_SECURE_REFRESH_TOKEN, { path: '/' });
  Cookies.remove(COOKIE_KEYS.SAVED_SECURE_TOKEN, { path: '/' });
  Cookies.remove(COOKIE_KEYS.ROLE_KEY, { path: '/' });
  Cookies.remove(COOKIE_KEYS.SAVED_USER_DATA, { path: '/' });
  localStorage.clear();
};

export {
  saveToken,
  getSavedToken,
  saveRefreshToken,
  getSavedRefreshToken,
  clearAllSavedData,
  saveUserData,
  getSavedUserData,
  saveUserRole,
  getUserRole,
};

import _ from 'lodash';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { ApisauceInstance } from 'apisauce';
import { ROUTERS, API, ROLE_PERMISSIONS } from '@constants';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import dayjs from 'dayjs';

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

import {
  getSavedRefreshToken,
  saveToken,
  saveRefreshToken,
  getUserRole,
  getSavedToken,
  
} from './Cookie.utils';

// Redirect screen
const redirect = (location: string, state?: any) => {
  return window.redirect(location, state);
};

// Check life of token
const checkTokenLifeTime = async (api: ApisauceInstance) => {
  const token = getSavedToken();
  const refreshToken = getSavedRefreshToken();
  if (!token && !refreshToken) {
    toast.warning('Please login to continue...!');
    return null;
  }
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const dateNow = new Date();
    if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
      if (refreshToken) {
        const res = await api.post(API.AUTH.REFRESH_TOKEN, { refreshToken });
        const newToken = _.get(res, 'data.payload.accessToken.token');
        const newRefreshToken = _.get(
          res,
          'data.payload.accessToken.refreshToken',
        );
        if (newToken && newRefreshToken) {
          saveToken(newToken);
          saveRefreshToken(newRefreshToken);
          return newToken;
        }
        toast.error('Your session has expired! Please login to continue...');
        return null;
      }
      toast.error('Your session has expired! Please login to continue...');
      return false;
    }
  }
  return token;
};

// Sleep for delay
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const checkRouterAccess = (router: string, isRedirect?: boolean) => {
  const permissions = ROLE_PERMISSIONS[router];
  const role: any = getUserRole() || '';
  if (!permissions || permissions.notAllowed.includes(role))
    return isRedirect ? redirect(ROUTERS.NOT_FOUND) : false;
  return permissions.allowed.includes(role);
};

const createMarkup = (html: any) => {
  return { __html: html };
};

const getFileExtension = (url: string): string | undefined => {
  const lastDotIndex = url.lastIndexOf('.');
  const lastSlashIndex = url.lastIndexOf('/');
  if (
    lastDotIndex > lastSlashIndex &&
    lastDotIndex !== -1 &&
    lastDotIndex < url.length - 1
  )
    return url.substring(lastDotIndex + 1);
  return undefined;
};

export {
  redirect,
  checkTokenLifeTime,
  sleep,
  checkRouterAccess,
  createMarkup,
  getFileExtension,
};

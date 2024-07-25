import { create, ApisauceInstance } from 'apisauce';
import _ from 'lodash';
import Utils from '@utils';
import { API, ROUTERS } from '@constants';

export type API_METHOD =
  | 'GET'
  | 'GET_BLOB'
  | 'PUT'
  | 'POST'
  | 'DEL'
  | 'FORM_DATA'
  | 'PUT_FORM_DATA'
  | 'PATCH';
export type ERROR_TYPE = 'ERROR' | 'WANRING' | 'SERVER_ERROR';
const AUTHORISED_ERROR = [401];
const INTERAL_SERVER_ERROR = [500, 501];
const BAD_REQUEST_ERROR = [400, 422];
const WRONG_URL_ERROR = [404];
const EXCLUDE_API = [
  API.AUTH.LOGIN
];

const getAPIConfig = async (url: string) => {

  const BASE_URL = import.meta.env.VITE_BE_URL;

  const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
  const timezoneOffset = timezoneOffsetInMinutes / 60;

  const api = create({
    baseURL: `${BASE_URL}api/`,
    headers: {
      Accept: 'application/json',
      'x-timezone-offset': -timezoneOffset,
    },
  });
  
  const splitUUID = url.replace(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g,
    '',
  );
  if (!_.includes(EXCLUDE_API, splitUUID)) {
    const validateToken = await Utils.checkTokenLifeTime(api);
    if (!validateToken) {
      Utils.redirect(ROUTERS.AUTH);
      return null;
    } else api.setHeader('Authorization', `Bearer ${validateToken}`);
  }
  return api;
};

// Handle error response
const handleErrorResponse = (
  type: ERROR_TYPE,
  params: { message: string; duration: number },
) => {
  const { message, duration } = params;
  const response = {
    type,
    message,
    duration,
  };
  return response;
};

// Handle response
const handleResponse = (res: any, resolve: any, reject: any) => {
  const message = _.get(res, 'data.message');
  const duration = _.get(res, 'duration') || 0;
  const status = _.get(res, 'status');
  const problem = _.get(res, 'problem');
  if (message === 'Not authorized.') return Utils.redirect(ROUTERS.AUTH);
  if (_.includes(AUTHORISED_ERROR, status))
    return reject(handleErrorResponse('WANRING', { message, duration }));
  if (_.includes(INTERAL_SERVER_ERROR, status))
    return reject(handleErrorResponse('SERVER_ERROR', { message, duration }));
  if (_.includes(BAD_REQUEST_ERROR, status))
    return reject(
      handleErrorResponse('ERROR', {
        message: `Bad request: ${message}`,
        duration,
      }),
    );
  if (_.includes(WRONG_URL_ERROR, status))
    return reject(
      handleErrorResponse('WANRING', { message: `URL not found`, duration }),
    );
  if (problem)
    return reject(handleErrorResponse('SERVER_ERROR', { message, duration }));
  return resolve(res);
};

const post = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.post(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const postFormData = async (api: ApisauceInstance, url: string, data?: any) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const res = await api.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const putFormData = async (api: ApisauceInstance, url: string, data?: any) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const res = await api.put(url, data, { headers });
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const get = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.get(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const getBlob = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.get(url, data, { responseType: 'blob' });
  return new Promise((resolve, reject) => {
    handleResponse(res, resolve, reject);
  });
};

const put = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.put(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const del = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = api.delete(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const patch = async (api: ApisauceInstance, url: string, data?: any) => {
  const res = await api.patch(url, data);
  return new Promise((resolve, reject) => {
    return handleResponse(res, resolve, reject);
  });
};

const sendRequest = async (url: string, method: API_METHOD, params?: any) => {
  const api = await getAPIConfig(url);
  
  if (!api) return;
  if (method === 'POST') return await post(api, url, params);
  if (method === 'GET') return await get(api, url, params);
  if (method === 'GET_BLOB') return getBlob(api, url, params);
  if (method === 'PUT') return await put(api, url, params);
  if (method === 'FORM_DATA') return await postFormData(api, url, params);
  if (method === 'DEL') return await del(api, url, params);
  if (method === 'PATCH') return await patch(api, url, params);
  return await putFormData(api, url, params);
};

export default sendRequest;

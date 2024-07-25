const ADMIN_ROOT = '/admin/';
const USER_ROOT = '/user/';

const BASIC_ROUTERS = {
  FORBIDEN: '/forbiden',
  NOT_FOUND: '*',
  AUTH: '/auth',
  HOME: '/'
};

const ADMIN_ROUTERS = {
  ADMIN_DASHBOARD: ADMIN_ROOT,

  ADMIN_CATEGORY: `${ADMIN_ROOT}categories`,
  ADMIN_UPDATE_CATEGORY: `${ADMIN_ROOT}categories/:id`,
  ADMIN_CREATE_CATEGORY: `${ADMIN_ROOT}create-categories`,

  ADMIN_PRODUCT: `${ADMIN_ROOT}products`,
  ADMIN_UPDATE_PRODUCT: `${ADMIN_ROOT}products/:id`,
  ADMIN_CREATE_PRODUCT: `${ADMIN_ROOT}create-products`,
};

const USER_ROUTERS = {
  USER_DASHBOARD: USER_ROOT,
  USER_CATEGORY: `${USER_ROOT}categories`,
  USER_UPDATE_CATEGORY: `${USER_ROOT}categories/:id`,
  USER_CREATE_CATEGORY: `${USER_ROOT}create-categories`,

  USER_PRODUCT: `${USER_ROOT}products`,
  USER_UPDATE_PRODUCT: `${USER_ROOT}products/:id`,
  USER_CREATE_PRODUCT: `${USER_ROOT}create-products`,
};

export {
  BASIC_ROUTERS,
  ADMIN_ROUTERS,
  USER_ROUTERS,
};

export default {
  ...BASIC_ROUTERS,
  ...ADMIN_ROUTERS,
  ...USER_ROUTERS,
};

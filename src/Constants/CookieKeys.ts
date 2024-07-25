const port = import.meta.env.VITE_APP_PORT || 3000;

export default {
  SAVED_SECURE_TOKEN: `@RIKKIE${port}:secure_token`,
  SAVED_SECURE_REFRESH_TOKEN: `@RIKKIE${port}:secure_refresh_token`,
  SAVED_USER_DATA: `@RIKKIE${port}:udata`,
  ROLE_KEY: `@RIKKIE${port}:role_key`,
};

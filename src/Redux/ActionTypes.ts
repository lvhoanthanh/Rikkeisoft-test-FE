interface ActionTypes {
  [key: string]: string;
}

const generateSyncActions = (actionList: string[]) => {
  const map: { [key: string]: string } = {};
  actionList.map((action) => {
    const name = action.trim();
    if (name !== '') {
      map[`${name}_SUCCESS`] = `${name}_SUCCESS`;
      map[`${name}_FAILURE`] = `${name}_FAILURE`;
    }
  });
  return map;
};

const generateLoadingActions = (actionList: string[]) => {
  const map: { [key: string]: string } = {};
  actionList.map((action) => {
    const name = action.trim();
    if (name !== '') {
      map[`SET_${name}_FETCH_LOADING`] = `SET_${name}_FETCH_LOADING`;
      map[`SET_${name}_GET_LOADING`] = `SET_${name}_GET_LOADING`;
      map[`SET_${name}_ACTION_LOADING`] = `SET_${name}_ACTION_LOADING`;
      map[`RESET_${name}_REDUCER`] = `RESET_${name}_REDUCER`;
    }
  });
  return map;
};

const _loadingActions: ActionTypes = generateLoadingActions([
  'AUTH',
  'CATEGORY',
  'PRODUCT',
]);

const _asyncActions: ActionTypes = generateSyncActions([
  'LOGIN',
  'FETCH_CATEGORY',
  'GET_CATEGORY_BY_ID',
  'CREATE_CATEGORY',
  'UPDATE_CATEGORY',
  'DELETE_CATEGORY',

  'FETCH_PRODUCT',
  'GET_PRODUCT_BY_ID',
  'CREATE_PRODUCT',
  'UPDATE_PRODUCT',
  'DELETE_PRODUCT',
]);

const _singleActions: ActionTypes = {
  // Authentication actions
  LOGOUT: 'LOGOUT',
};

const ACTION_TYPES = {
  ..._asyncActions,
  ..._singleActions,
  ..._loadingActions,
};

const DEFAULT_LOADING_STATES = {
  isFetchLoading: false,
  isGetLoading: false,
  isActionLoading: false,
};

const DEFAULT_PAGINATION = {
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
  totalPages: 1,
  itemCount: 0,
};

export { ACTION_TYPES, DEFAULT_LOADING_STATES, DEFAULT_PAGINATION };

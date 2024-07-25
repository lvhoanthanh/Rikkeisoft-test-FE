import { IFetchData } from '@/Interfaces/FetchData.interface';
import { ACTION_TYPES, DEFAULT_LOADING_STATES, DEFAULT_PAGINATION } from '../../ActionTypes';

const DEFAULT_FILTER: IFetchData = {
  page: 1,
  limit: 20,
  name: '',
};

const initialState = {
  ...DEFAULT_LOADING_STATES,
  requestHasError: false,
  requestIsSuccess: false,
  productsList: [],
  details: null,
  paginate: DEFAULT_PAGINATION,
  filters: DEFAULT_FILTER,
};

export default (
  state = initialState,
  action: { type: string; payload: any },
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_PRODUCTS_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: true,
      };
    }
    case ACTION_TYPES.SET_PRODUCTS_GET_LOADING: {
      return {
        ...state,
        isGetLoading: true,
      };
    }
    case ACTION_TYPES.SET_PRODUCTS_FETCH_LOADING: {
      return {
        ...state,
        isFetchLoading: true,
      };
    }
    case ACTION_TYPES.RESET_PRODUCT_REDUCER: {
      return initialState;
    }

    case ACTION_TYPES.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isFetchLoading: false,
        categoriesList: payload?.items,
        paginate: payload?.meta,
        details: null,
      };
    }
    case ACTION_TYPES.FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isFetchLoading: false,
        categoriesList: [],
        paginate: DEFAULT_PAGINATION,
        details: null,
      };
    }

    case ACTION_TYPES.GET_PRODUCT_BY_ID_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isGetLoading: false,
        details: payload,
        publicBlogDetails: payload,
      };
    }
    case ACTION_TYPES.GET_PRODUCT_BY_ID_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isGetLoading: false,
        details: null,
        publicBlogDetails: null,
      };
    }

    case ACTION_TYPES.CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    }
    case ACTION_TYPES.CREATE_PRODUCT_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    }

    case ACTION_TYPES.UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    }
    case ACTION_TYPES.UPDATE_PRODUCT_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    }

    case ACTION_TYPES.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    }
    case ACTION_TYPES.DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    }
    default:
      return state;
  }
};

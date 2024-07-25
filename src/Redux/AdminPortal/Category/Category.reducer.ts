import { IFetchData } from '@/Interfaces/FetchData.interface';
import { ACTION_TYPES, DEFAULT_LOADING_STATES, DEFAULT_PAGINATION } from '../../ActionTypes';

const DEFAULT_FILTER: IFetchData = {
  page: 1,
  limit: 20,
  title: '',
};

const initialState = {
  ...DEFAULT_LOADING_STATES,
  requestHasError: false,
  requestIsSuccess: false,
  categoriesList: [],
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
    case ACTION_TYPES.SET_CATEGORY_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: true,
      };
    }
    case ACTION_TYPES.SET_CATEGORY_GET_LOADING: {
      return {
        ...state,
        isGetLoading: true,
      };
    }
    case ACTION_TYPES.SET_CATEGORY_FETCH_LOADING: {
      return {
        ...state,
        isFetchLoading: true,
      };
    }
    case ACTION_TYPES.RESET_CATEGORY_REDUCER: {
      return initialState;
    }

    case ACTION_TYPES.FETCH_CATEGORY_SUCCESS: {
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
    case ACTION_TYPES.FETCH_CATEGORY_FAILURE: {
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

    case ACTION_TYPES.GET_CATEGORY_BY_ID_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isGetLoading: false,
        details: payload,
        publicBlogDetails: payload,
      };
    }
    case ACTION_TYPES.GET_CATEGORY_BY_ID_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isGetLoading: false,
        details: null,
        publicBlogDetails: null,
      };
    }

    case ACTION_TYPES.CREATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    }
    case ACTION_TYPES.CREATE_CATEGORY_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    }

    case ACTION_TYPES.UPDATE_CATEGORY_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    }
    case ACTION_TYPES.UPDATE_CATEGORY_FAILURE: {
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    }

    case ACTION_TYPES.DELETE_CATEGORY_SUCCESS: {
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    }
    case ACTION_TYPES.DELETE_CATEGORY_FAILURE: {
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

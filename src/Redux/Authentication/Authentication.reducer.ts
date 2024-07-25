import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '../ActionTypes';

const initialState = {
  ...DEFAULT_LOADING_STATES,
  requestHasError: false,
  requestIsSuccess: false,
  selfProfile: null,
  errorMessage: null,
};

export default (
  state = initialState,
  action: { type: string; payload: any },
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_AUTH_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: true,
      };
    }
    case ACTION_TYPES.SET_AUTH_GET_LOADING: {
      return {
        ...state,
        isGetLoading: true,
      };
    }

    case ACTION_TYPES.GET_SELF_PROFILE_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: true,
        isGetLoading: false,
        selfProfile: payload,
        errorMessage: null,
      };
    case ACTION_TYPES.GET_SELF_PROFILE_FAILURE:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: true,
        isGetLoading: false,
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: true,
        isActionLoading: false,
        selfProfile: payload,
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: false,
        selfProfile: null,
      };
    case ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    case ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.REQUEST_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    case ACTION_TYPES.REQUEST_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
      };
    case ACTION_TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.UPDATE_SELF_PASSWORD_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        isChangePasswordSuccess: true,
      };
    case ACTION_TYPES.UPDATE_SELF_PASSWORD_FAILURE:
      return {
        ...state,
        requestIsSuccess: false,
        requestHasError: true,
        isActionLoading: false,
        isChangePasswordSuccess: false,
      };
    case ACTION_TYPES.UPDATE_SELF_PROFILE_SUCCESS:
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
        selfProfile: payload,
        errorMessage: null,
      };
    case ACTION_TYPES.UPDATE_SELF_PROFILE_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        errorMessage: payload,
      };
    case ACTION_TYPES.CHANGE_PROFILE_AVATAR_SUCCESS:
      return {
        ...state,
        requestHasError: false,
        requestIsSuccess: true,
        isActionLoading: false,
        selfProfile: payload,
      };
    case ACTION_TYPES.CHANGE_PROFILE_AVATAR_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };
    default:
      return state;
  }
};

import _ from 'lodash';
import { ROUTERS } from '@constants';
import { ROLES } from '@enums';
import { ACTION_TYPES } from '../ActionTypes';
import API from '@/APIs';
import Utils from '@utils';
import {
  ILoginStructure,
} from '@interfaces/Auth.interface';
import { persistor } from '../store';
import { resetCategorysReducer } from '../AdminPortal/Category/Category.action';
import { resetProductReducer } from '../AdminPortal/Product/Product.action';

// SINGLE ACTIONS
const setAuthActionLoading = () => {
  return {
    type: ACTION_TYPES.SET_AUTH_ACTION_LOADING,
  };
};

const setAuthGetLoading = () => {
  return {
    type: ACTION_TYPES.SET_AUTH_GET_LOADING,
  };
};

const setLogged = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
};

const logout = (isNotRedirect?: boolean) => {
  const userRole = Utils.getUserRole();
  return async (dispatch: any) => {
    Utils.clearAllSavedData();
    dispatch(setLogged());
    switch (userRole) {
      case ROLES.ADMIN:
        {
          dispatch(resetCategorysReducer());
          dispatch(resetProductReducer());
        }
        break;
      case ROLES.USER:
        {
          dispatch(resetCategorysReducer());
          dispatch(resetProductReducer());
        }
        break;
      default: {
        dispatch(resetCategorysReducer());
        dispatch(resetProductReducer());
      }
    }
    persistor
      .purge()
      .then(() => {
        console.log('State purged successfully.');
        if (!isNotRedirect) Utils.redirect(ROUTERS.AUTH);
      })
      .catch((error) => {
        console.error('Error purging state:', error);
      });
  };
};

const generateSavedUser = (userPayload: any) => {
  const email = _.get(userPayload, 'email') || '';
  const userData: any = _.get(userPayload, 'userData');
  const staffCode: any = _.get(userPayload, 'staffCode');
  const showCustomersBought = _.get(userPayload, 'showCustomersBought');
  const showDataCustomersBought = _.get(userPayload, 'showDataCustomersBought');
  const bankInformation: any = _.get(userPayload, 'bankInformation');
  const customerStripeId: any = _.get(userPayload, 'customerStripeId');
  const salerRecommended: any = _.get(userPayload, 'salerRecommended');
  const companyInformation = _.get(userPayload, 'companyInformation');
  const workspace = _.get(userPayload, 'workspace');
  const discount = _.get(userPayload, 'discount');
  const inviteCode = userPayload?.inviteCode;
  const referralCode = userPayload?.referralCode;
  const allowUseFreetrial = userPayload?.allowUseFreetrial;

  return {
    ...userData,
    email,
    showCustomersBought,
    showDataCustomersBought,
    bankInformation,
    customerStripeId,
    salerRecommended,
    companyInformation,
    workspace,
    staffCode,
    discount,
    inviteCode,
    referralCode,
    allowUseFreetrial,
  };
};

// ASYNC ACTIONS
const loginSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
    payload,
  };
};

const loginFail = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

const login = (payload: ILoginStructure) => {
  return async (dispatch: any) => {
    dispatch(setAuthActionLoading());
    await API.login(payload)
      .then(async (response: any) => {
        const result: any = await Utils.resolveResponse(response, true);
        if (!result) await dispatch(loginFail());
        else {
          const token = _.get(result, 'accessToken.token') || '';
          const userPayload = _.get(result, 'user');
          const userRole: any = _.get(result, 'user.role.roleCode') || '';
          Utils.saveToken(token);
          Utils.saveUserData(generateSavedUser(userPayload));
          Utils.saveUserRole(userRole);
          await Utils.sleep(1000);
          await dispatch(loginSuccess(generateSavedUser(userPayload)));

          if (userRole === ROLES.USER)
            Utils.redirect(ROUTERS.USER_CATEGORY);
          if (userRole === ROLES.ADMIN)
            Utils.redirect(ROUTERS.ADMIN_PRODUCT);

        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(loginFail());
      });
  };
};

const getSelfSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_SELF_PROFILE_SUCCESS,
    payload,
  };
};

const getSelfFailure = () => {
  return {
    type: ACTION_TYPES.GET_SELF_PROFILE_FAILURE,
  };
};

const getSelfProfile = () => {
  return async (dispatch: any) => {
    dispatch(setAuthGetLoading());
    await API.getSelfProfile()
      .then(async (response: any) => {
        const result: any = await Utils.resolveResponse(response, true);
        if (!result) await dispatch(getSelfFailure());
        else {
          await dispatch(getSelfSuccess(generateSavedUser(result)));
          Utils.saveUserData(generateSavedUser(result));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        dispatch(getSelfFailure());
      });
  };
};


export {
  login,
  logout,
  getSelfProfile,
};

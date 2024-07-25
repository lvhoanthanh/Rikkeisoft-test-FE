import { combineReducers } from 'redux';

import AUTHENTICATION from './Authentication/Authentication.reducer';
// Landing Page
import COMMON from './Common/Common.reducer';

// Admin Portal
import AP_CATEGORY from './AdminPortal/Category/Category.reducer';

const createRootReducer = () =>
  combineReducers({
    AUTHENTICATION,
    COMMON,
    AP_CATEGORY,
  });

export default createRootReducer;

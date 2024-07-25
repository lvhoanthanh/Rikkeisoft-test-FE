import { ACTION_TYPES } from '../ActionTypes';

// SINGLE ACTIONS
const setContentLoaded = (payload: boolean) => {
  return {
    type: ACTION_TYPES.CONTENT_IS_LOADED,
    payload,
  };
};

export { setContentLoaded };

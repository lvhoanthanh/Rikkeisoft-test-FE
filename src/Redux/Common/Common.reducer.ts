import { ACTION_TYPES } from '../ActionTypes';

const initialState = {
  contentIsLoaded: false,
  expandSidebar: true,
};

export default (
  state = initialState,
  action: { type: string; payload: boolean },
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.CONTENT_IS_LOADED:
      return {
        ...state,
        contentIsLoaded: payload,
      };
    case ACTION_TYPES.EXPAND_SIDEBAR:
      return {
        ...state,
        expandSidebar: payload,
      };

    default:
      return state;
  }
};

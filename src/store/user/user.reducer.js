import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE_START:
      return {
        loading: true,
        error: null,
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        currentUser: payload,
        loading: false,
        error: null,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      }
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};


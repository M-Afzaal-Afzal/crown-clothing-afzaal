import { createAction } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";


// export const setCurrentUser = (user) => {
//   return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
// };

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const signInWithGoogleStart = () => createAction(USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE_START);


export const signInWithEmailStart = (email, password) => createAction(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_START, { email, password });

export const signUpWithEmailStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_WITH_EMAIL_START, { email, password, displayName });


export const userAuthSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const userAuthFailure = (error) => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
}

export const userSignOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const userSignOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const userSignOutFailure = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
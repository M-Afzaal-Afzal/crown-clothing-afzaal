import { User } from "firebase/auth";
import { UserData } from "../../utils/firebase/firebase.utils";
import { Action, ACtionWithPayload, createAction, withMatcher } from "../../utils/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// Action Return Types
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export type SignInWithGoogleStart = Action<USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE_START>;
export type SignInWithEmailStart = ACtionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_START,
  { email: string; password: string }
>;
export type UserAuthSuccess = ACtionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;
export type SignUpWithEmailStart = ACtionWithPayload<
  USER_ACTION_TYPES.SIGN_UP_WITH_EMAIL_START,
  { email: string; password: string; displayName: string }
>;
export type UserAuthFailure = ACtionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;
export type UserSignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type UserSignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type UserSignOutFailure = ACtionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;

// Actions
export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const signInWithGoogleStart = withMatcher(
  (): SignInWithGoogleStart => createAction(USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE_START)
);

export const signInWithEmailStart = withMatcher(
  (email: string, password: string): SignInWithEmailStart =>
    createAction(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_START, { email, password })
);

export const signUpWithEmailStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpWithEmailStart =>
    createAction(USER_ACTION_TYPES.SIGN_UP_WITH_EMAIL_START, { email, password, displayName })
);

export const userAuthSuccess = withMatcher(
  (user: UserData & { id: string }): UserAuthSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const userAuthFailure = withMatcher((error: Error): UserAuthFailure => {
  return createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
});

export const userSignOutStart = withMatcher(
  (): UserSignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const userSignOutSuccess = withMatcher(
  (): UserSignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const userSignOutFailure = withMatcher(
  (error: Error): UserSignOutFailure => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

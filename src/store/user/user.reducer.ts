import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
  signInWithGoogleStart,
  userAuthFailure,
  userAuthSuccess,
  userSignOutFailure,
  userSignOutSuccess
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
  const { payload } = action;
  if (signInWithGoogleStart.match(action)) {
    return {
      ...state,
      isLoading: true,
      error: null
    };
  }

  if (userAuthSuccess.match(action)) {
    return {
      currentUser: payload,
      isLoading: false,
      error: null
    };
  }

  if (userSignOutSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      currentUser: null
    };
  }

  if (userSignOutFailure.match(action) || userAuthFailure.match(action)) {
    return {
      ...state,
      error: payload,
      isLoading: false
    };
  }

  return state;
};

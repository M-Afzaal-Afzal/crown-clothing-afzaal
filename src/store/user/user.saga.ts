import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "typed-redux-saga/macro";
import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser
} from "../../utils/firebase/firebase.utils";
import {
  SignInWithEmailStart,
  SignUpWithEmailStart,
  userAuthFailure,
  userAuthSuccess,
  userSignOutFailure,
  userSignOutSuccess
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

function* updateUser(user: User, additionalInfo?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, user, additionalInfo);
    if (userSnapshot) {
      yield* put(userAuthSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(userAuthFailure(error as Error));
  }
}

function* checkIsUserAuthenticated() {
  const currentUser = yield* call(getCurrentUser);

  if (!currentUser) return;

  yield* call(updateUser, currentUser);
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* updateUser(user);
  } catch (error) {
    yield* put(userAuthFailure(error as Error));
  }
}

function* signInWithEmail(action: SignInWithEmailStart) {
  const {
    payload: { email, password }
  } = action;
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* updateUser(user);
    }
  } catch (error) {
    yield* put(userAuthFailure(error as Error));
  }
}

function* signUp(action: SignUpWithEmailStart) {
  const {
    payload: { email, password, displayName }
  } = action;

  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* updateUser(user, { displayName });
    }
  } catch (error) {
    yield* put(userAuthFailure(error as Error));
  }
}

function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(userSignOutSuccess());
  } catch (error) {
    yield* put(userSignOutFailure(error as Error));
  }
}

function* onSignInWithGoogleStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE_START, signInWithGoogle);
}

function* onSignInWithEmailStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_START, signInWithEmail);
}

function* checkUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, checkIsUserAuthenticated);
}

function* onSignUpWithEmailStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_WITH_EMAIL_START, signUp);
}

function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield* all([
    call(checkUserSession),
    call(onSignInWithGoogleStart),
    call(onSignInWithEmailStart),
    call(onSignUpWithEmailStart),
    call(onSignOutStart)
  ]);
}

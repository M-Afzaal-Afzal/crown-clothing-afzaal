import { all, call, put, takeLatest } from "redux-saga/effects";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from "../../utils/firebase/firebase.utils";
import { userAuthFailure, userAuthSuccess, userSignOutFailure, userSignOutSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

function* updateUser(user, additionalInfo) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, user, additionalInfo);
    yield put(userAuthSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(userAuthFailure(USER_ACTION_TYPES.SIGN_IN_FAILED, error));
  }
}

function* checkIsUserAuthenticated() {
  const currentUser = yield call(getCurrentUser);

  if (!currentUser) return;

  yield call(updateUser, currentUser)
}

function* signInWithGoogle() {
  try {
    const { user } = yield signInWithGooglePopup();
    yield updateUser(user);
  } catch (error) {
    yield put(userAuthFailure(error));
  }
}

function* signInWithEmail(action) {
  const { payload: { email, password } } = action;
  try {
    const { user } = yield signInAuthUserWithEmailAndPassword(email, password);
    yield updateUser(user);
  } catch (error) {
    yield put(userAuthFailure(error));
  }
}

function* signUp(action) {

  const { payload: { email, password, displayName } } = action;

  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword(email, password));
    yield updateUser(user, { displayName })
  } catch (error) {
    yield put(userAuthFailure(error));
  }
}

function* signOut() {
  try {
    yield call(signOutUser);
    yield put(userSignOutSuccess());
  } catch (error) {
    yield put(userSignOutFailure(error));
  }
}

function* onSignInWithGoogleStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE_START, signInWithGoogle)
}

function* onSignInWithEmailStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_START, signInWithEmail)
}

function* checkUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, checkIsUserAuthenticated);
}

function* onSignUpWithEmailStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_WITH_EMAIL_START, signUp)
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
  yield all([call(checkUserSession), call(onSignInWithGoogleStart), call(onSignInWithEmailStart), call(onSignUpWithEmailStart), call(onSignOutStart)])
}
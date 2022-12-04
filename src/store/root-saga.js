import { all, call } from 'redux-saga/effects';
import { categorySaga } from './category/category.saga';
import { userSaga } from './user/user.saga';

export function* rootSaga() {
  yield all([call(categorySaga), call(userSaga)])
}
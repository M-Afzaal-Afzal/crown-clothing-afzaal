import { all, call, takeLatest, put } from "typed-redux-saga";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFail, fetchCategoriesSuccess } from "./category.action";
import { CATEGORY_ACTION_TYPES } from "./category.types";

function* fetchCategoriesAsync() {
  try {
    const categoriesArr = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArr));
  } catch (err) {
    yield* put(fetchCategoriesFail(err as Error));
  }
}

function* onFetchCategoriesStart() {
  yield* takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categorySaga() {
  yield* all([call(onFetchCategoriesStart)]);
}

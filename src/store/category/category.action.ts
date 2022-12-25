import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { Action, ACtionWithPayload, createAction, withMatcher } from "../../utils/reducer.utils";
import { Category, CATEGORY_ACTION_TYPES } from "./category.types";

// export const setCategories = (categories) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories);

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ACtionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFail = ACtionWithPayload<
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
  Error
>;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categories: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFail = withMatcher(
  (error: Error): FetchCategoriesFail =>
    createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error)
);

export const fetchCategories = () => async (dispatch: any) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error: any) {
    dispatch(fetchCategoriesFail(error));
  }
};

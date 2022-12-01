import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";

// export const setCategories = (categories) => createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categories);

const fetchCategoriesStart = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

const fetchCategoriesSuccess = (categories) => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

const fetchCategoriesFail = () => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL);

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFail(error));
  }
}
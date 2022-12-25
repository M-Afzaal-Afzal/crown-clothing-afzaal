import { AnyAction } from "redux";
import {
  fetchCategoriesFail,
  fetchCategoriesStart,
  fetchCategoriesSuccess
} from "./category.action";
import { Category } from "./category.types";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
};

export const categoryReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, isLoading: false, error: null, categories: action.payload };
  }

  if (fetchCategoriesFail.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }

  return state;
};

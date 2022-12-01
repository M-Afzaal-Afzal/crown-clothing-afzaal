import { CATEGORY_ACTION_TYPES } from "./category.types";

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        error: null,
        isLoading: false,
      }
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      }

    default:
      return state;
  }
}
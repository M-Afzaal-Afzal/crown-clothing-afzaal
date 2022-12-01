import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.category;

const selectCategories = createSelector([selectCategoryReducer], (categorySlice) => categorySlice.categories)

export const selectCategoriesMap = createSelector([selectCategories], (categories) => categories.reduce((acc, category) => {
  const { title, items } = category;
  acc[title.toLowerCase()] = items;
  return acc;
}, {}))

export const selectIsCategoriesLoading = createSelector([selectCategoryReducer], (categorySlice) => categorySlice.isLoading);

import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.category;

const selectCategories = createSelector([selectCategoryReducer], (categorySlice) => categorySlice.categories)

export const selectCategoriesMap = createSelector([selectCategories], (categories) => categories.reduce((acc, docSnapshot) => {
  const { title, items } = docSnapshot.data()
  acc[title.toLowerCase()] = items;
  return acc;
}, {}))


import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state: RootState): CategoriesState => state.category;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);

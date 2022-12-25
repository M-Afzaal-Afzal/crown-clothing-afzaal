import { CategoryPreview } from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectIsCategoriesLoading
} from "../../store/category/category.selector";
import { Loader } from "../../components/loader/loader.component";

export const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isCategoriesLoading = useSelector(selectIsCategoriesLoading);

  return (
    <>
      {isCategoriesLoading ? (
        <Loader />
      ) : (
        <>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return <CategoryPreview key={title} title={title} products={products} />;
          })}
        </>
      )}
    </>
  );
};

import { useCategoriesContext } from "../../context/categories.context";
import { CategoryPreview } from "../../components/category-preview/category-preview.component";

export const CategoriesPreview = () => {
  const { categoriesMap } = useCategoriesContext();
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products} />;
      })}
    </>
  );
};

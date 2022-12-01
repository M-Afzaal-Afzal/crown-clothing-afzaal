import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/loader/loader.component";
import { ProductCard } from "../../components/product-card/product-card.component";
import {
  selectCategoriesMap,
  selectIsCategoriesLoading
} from "../../store/category/category.selector";
import "./category.styles.scss";

export const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);
  const isCategoriesLoading = useSelector(selectIsCategoriesLoading);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      {isCategoriesLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="category-title">{category.toUpperCase()}</h2>
          <div className="category-container">
            {products &&
              products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </>
      )}
    </>
  );
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components/product-card/product-card.component";
import { useCategoriesContext } from "../../context/categories.context";
import "./category.styles.scss";

export const Category = () => {
  const { category } = useParams();

  const { categoriesMap } = useCategoriesContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
};

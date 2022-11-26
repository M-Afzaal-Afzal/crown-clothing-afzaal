import "./shop.styles.scss";
import { ProductCard } from "../../components/product-card/product-card.component";
import { useProductsContext } from "../../context/products.context";

export const Shop = () => {
  const { products } = useProductsContext();
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

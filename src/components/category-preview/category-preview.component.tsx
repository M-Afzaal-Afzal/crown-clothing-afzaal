import { Link } from "react-router-dom";
import { ProductCard } from "../product-card/product-card.component";
import "./category-preview.styles.scss";
import { CategoryItem } from "../../store/category/category.types";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

export const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title}>
          <span className="title">{title.toUpperCase()}</span>
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

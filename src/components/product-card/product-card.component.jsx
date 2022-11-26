import "./product-card.styles.scss";
import { Button } from "../button/button.component";
import { useCartContext } from "../../context/cart.context";

export const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useCartContext();

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType={"inverted"}>
        Add to cart
      </Button>
    </div>
  );
};

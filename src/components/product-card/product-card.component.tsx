import "./product-card.styles.scss";
import { BUTTON_TYPE_CLASSES, Button } from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/category/category.types";

type ProductCardProps = {
  product: CategoryItem;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>
        Add to cart
      </Button>
    </div>
  );
};

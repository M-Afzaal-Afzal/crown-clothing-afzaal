import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useCartContext } from "../../context/cart.context";

export const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useCartContext();

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">20</span>
    </div>
  );
};

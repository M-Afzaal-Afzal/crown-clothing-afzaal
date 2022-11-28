import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";
import { useCartContext } from "../../context/cart.context";

export const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCartContext();

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

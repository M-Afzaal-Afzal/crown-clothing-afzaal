import { createContext, useContext, useState } from "react";

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = {
    isCartOpen,
    setIsCartOpen
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);

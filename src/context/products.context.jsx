import { createContext, useContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

const ProductsContext = createContext({
  products: []
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProductsContext = () => useContext(ProductsContext);

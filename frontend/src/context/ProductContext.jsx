import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlisted, setWishlisted] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState([]);

  useEffect(() => {
    axios.get("/product").then(({ data }) => {
      setProducts(data);

      setFilteredProducts(data);
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        wishlisted,
        setWishlisted,
        cart,
        setCart,
        isAddedToCart,
        setIsAddedToCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

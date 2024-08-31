import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (!quantity) return 0;

    return quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    //  Product not in cart
    if (quantity === 0) setCartProducts([...cartProducts, { id, quantity: 1 }]);
    //   Product in cart
    else
      setCartProducts(
        cartProducts.map((product) =>
          //   If  id matches the product quantity will increase 1
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : // If id does not match the current product will be returned with no changes
              product
        )
      );
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) deleteFromCart(id);
    else
      setCartProducts(
        cartProducts.map((product) =>
          //   If  id matches the product quantity will decrease 1
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : // If id does not match the current product will be returned with no changes
              product
        )
      );
  };

  const deleteFromCart = (id) => {
    setCartProducts((cartProducts) =>
      //   If true, product will be returned
      cartProducts.filter((product) => product.id !== id)
    );
  };

  const getTotalCost = () => {
    let totalCost = 0;

    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += cartItem.quantity * productData.price;
    });
    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

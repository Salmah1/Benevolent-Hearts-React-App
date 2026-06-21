import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  // Load cart from localStorage when the application starts
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);

      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Persist order completion between page refreshes
  const [paymentComplete, setPaymentComplete] = useState(
    sessionStorage.getItem("paymentComplete") === "true",
  );

  const completePayment = () => {
    sessionStorage.setItem("paymentComplete", "true");
    setPaymentComplete(true);
  };

  const resetPayment = () => {
    sessionStorage.removeItem("paymentComplete");
    setPaymentComplete(false);
  };

  // Save cart whenever contents change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        paymentComplete,
        completePayment,
        resetPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

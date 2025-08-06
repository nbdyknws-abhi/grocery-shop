/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// ✅ Grocery Cart Context
export const CartContext = createContext();

// ✅ Import all images
import milk from "../assets/milk.jpeg";
import bread from "../assets/bread.jpeg";
import eggs from "../assets/eggs.jpeg";
import salt from "../assets/salt.jpeg";
import maggie from "../assets/maggie.jpeg";
import cornflakes from "../assets/cornflakes.jpeg";
import tomato from "../assets/tomato.jpeg";
import oreo from "../assets/oreo.jpeg";
import bourboan from "../assets/bourboan.jpeg";
import mariegold from "../assets/mariegold.jpeg";
import onion from "../assets/onion.jpeg";
import garlic from "../assets/garlic.jpeg";
import darkfantasy from "../assets/darkfantasy.jpeg";
import dabur from "../assets/dabur.jpeg";
import indiagate from "../assets/indiagate.jpeg";
import closeup from "../assets/closeup.jpeg";

// ✅ Image mapping
const fallbackImages = {
  milk,
  bread,
  eggs,
  salt,
  maggie,
  cornflakes,
  tomato,
  oreo,
  bourboan,
  mariegold,
  onion,
  garlic,
  darkfantasy,
  dabur,
  indiagate,
  closeup,
};

// ✅ Context Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const key = item.name?.toLowerCase().replace(/\s+/g, "");
    const image = fallbackImages[key] || milk;
    const updatedItem = { ...item, image, quantity: 1 };

    setCartItems((prev) => {
      // Check if item already exists
      const existingItemIndex = prev.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add new item
        return [...prev, updatedItem];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

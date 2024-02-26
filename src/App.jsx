// App.js
import React from 'react';
import './App.css';
import ProductList from './ProductList';
import Cart from './Cart';

// Create Context for Cart
export const CartContext = React.createContext();

const Cons=() =>{
  const [cartItems, setCartItems] = React.useState([]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((prevItem) => prevItem.id === item.id);
      if (existingItem) {
        // If exists, update quantity
        return prevItems.map((prevItem) =>
          prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
        );
      } else {
        // If not exists, add new item
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: quantity } : item))
    );
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, updateCartItemQuantity }}
    >
      <div className="App">
        <h1>Shopping Cart</h1>
        <div className="content">
          <ProductList />
          <Cart totalQuantity={totalQuantity} totalPrice={totalPrice} />
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default Cons;

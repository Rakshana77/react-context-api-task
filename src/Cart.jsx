// Cart.js
import propTypes from "prop-types"
import React from 'react';
import { CartContext } from './App';


function Cart({ totalQuantity, totalPrice }) {
  const { cartItems, removeItemFromCart, updateCartItemQuantity } = React.useContext(CartContext);
  Cart.propTypes = {
    totalQuantity: propTypes.number,
    totalPrice:propTypes.number
}
  return (
    <div className="cart">
      <h2>Cart</h2>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
            />
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;

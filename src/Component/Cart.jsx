import React from "react";
import "./Cart.css";

const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div className="item-details">
        <h3>{item.title}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <button onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    </div>
  );
};

const Cart = ({ cart, increaseQuantity, decreaseQuantity, removeItem }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
        />
      ))}
      <div className="total-price">
        <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;

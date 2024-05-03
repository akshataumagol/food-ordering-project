import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext.jsx";
import Layout from "../Component/Layouts/Layout.jsx";
import { useNavigate } from 'react-router-dom';
import "../Styles/CartStyle.css";

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);

  /*useEffect(() => {
    // Fetch cart items for the current user
    axios.get(`/api/cart/${userId}`)
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, [userId]);*/

  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const handleAddress = () => {
    if (cart.length > 0) {
      // Calculate the total amount
      const totalAmount = calculateOverallTotal();
  
      // Proceed to the Payment page with the total amount as state
      navigate("/Payment", { state: { totalAmount } });
    } else {
      alert("Your cart is empty. Please add items before proceeding to address.");
    }
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const increaseQuantity = (itemId) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: itemId });
  };

  const decreaseQuantity = (itemId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: itemId });
  };

  const calculateProductTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateOverallTotal = () => {
    return cart.reduce((total, item) => total + calculateProductTotal(item.price, item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <h2 className="head">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="item-info">
            <div className="price-quantity-total">
              <p>{item.title}</p>
              <p>Price: Rs{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Product Total: Rs{calculateProductTotal(item.price, item.quantity)}</p>
            </div>
          </div>
          <div className="buttons-container">
            <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+</button>
            <button className="quantity-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="checkout-container">
        <div className="totals">
          <p className="total">Overall Total: Rs{calculateOverallTotal()}</p>
        </div>
        <div className="checkout-btn-container">
          <button className="checkout-btn" onClick={handleAddress}>proced</button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  return (
    <Layout>
      <CartPage />
    </Layout>
  );
};

export default Cart;
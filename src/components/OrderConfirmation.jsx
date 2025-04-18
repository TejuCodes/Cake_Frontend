import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {  amount, cakeName } = state || {};

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for your purchase.</p>
        
        <div className="order-details">
          <p><strong>Cake:</strong> {cakeName}</p>
          <p><strong>Amount Paid:</strong> ₹{amount}</p>
        </div>
        <p className="confirmation-message">
          Your order will be delivered within 2 hours in your address shortly.
          </p>
        <button 
          className="continue-shopping"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
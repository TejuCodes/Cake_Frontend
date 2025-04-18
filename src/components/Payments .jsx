import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cake, quantity, totalPrice, address, user, mobileNumber } = location.state || {};
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card payment
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "card" && (!cardNumber || !expiryDate || !cvv)) {
      alert("Please fill in all payment details.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing (replace with actual payment gateway integration)
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/success", {
        state: { cake, quantity, totalPrice, address, user, paymentMethod, mobileNumber },
      });
    }, 2000);
  };

  return (
    <>
    
    <div className="custom-payments-container">
  <h2>Payment Details</h2>
  {cake ? (
    <>
      <div className="custom-order-summary">
        <img src={cake.image} alt={cake.name} className="custom-order-img" />
        <div className="custom-order-details">
          <p><strong>{cake.name}</strong> - {cake.detail}</p>
          <p><strong>Quantity:</strong> {quantity} kg</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
          <p><strong>Delivery Address:</strong> {address}</p>
          <p><strong>Mobile Number:</strong> {mobileNumber}</p>
        </div>
      </div>

      <form className="custom-payments-form" onSubmit={handleSubmit}>
        <div className="custom-payment-method">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "card" && (
          <>
            <label>Card Number:</label>
            <input
              type="text"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="custom-input-field"
            />

            <label>Expiry Date:</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="custom-input-field"
            />

            <label>CVV:</label>
            <input
              type="text"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className="custom-input-field"
            />
          </>
        )}

        <button type="submit" className="custom-submit-btn" disabled={isProcessing}>
          {isProcessing
            ? "Processing..."
            : paymentMethod === "card"
            ? "Pay Now"
            : "Confirm Order"}
        </button>
        <button  className="custom-submit-btn" onClick={() => window.history.back()}>Go Back</button>
      </form>
    </>
  ) : (
    <p>No order details found. Please go back and try again.</p>
  )}
</div>

    </>
  );
};

export default Payments;
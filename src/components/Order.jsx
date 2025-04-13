import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cake } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(cake ? cake.price : 0);
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please log in to place an order.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!cake) {
      navigate("/");
    }
  }, [cake, navigate]);

  const handleQuantityChange = (e) => {
    const selectedQuantity = parseInt(e.target.value);
    setQuantity(selectedQuantity);
    setTotalPrice(selectedQuantity * cake.price);
  };

  const isValidMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidMobile(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const orderData = {
      useremail: user.email,
      cake_name: cake.name,
      cake_url: cake.image,
      cake_price: totalPrice,
      cake_quan: quantity,
      address,
      mobileNumber,
    };

    try {
      setIsProcessing(true);
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (result.success) {
        navigate("/payments", {
          state: { cake, quantity, totalPrice, address, user, mobileNumber },
        });
      } else {
        alert("Order failed: " + result.error);
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="custom-order-container">
      <img src={cake.image} alt={cake.name} className="custom-order-img" height={400} width={200} />
      <div className="custom-order-details">
        <h2>Order Summary</h2>
        <h3>{cake.name}</h3>
        <p>{cake.detail}</p>

        <div className="custom-quantity-container">
          <label>Quantity:</label>
          <select
            value={quantity}
            onChange={handleQuantityChange}
            className="custom-quantity-select"
            disabled={isProcessing}
          >
            {[1, 2, 3, 4, 5].map((kg) => (
              <option key={kg} value={kg}>
                {kg} kg
              </option>
            ))}
          </select>
        </div>

        <p>Price per kg: ₹{cake.price}</p>
        <h3>Total Price: ₹{totalPrice}</h3>

        <form className="custom-order-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={user?.name || ""} readOnly className="custom-readonly-input" />

          <label>Mobile Number:</label>
          <input
            style={{ backgroundColor: "white" }}
            type="tel"
            pattern="[6-9]{1}[0-9]{9}"
            maxLength="10"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />

          <label>Address:</label>
          <input
            style={{ backgroundColor: "white" }}
            type="text"
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button type="submit" className="custom-submit-btn" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Confirm Order"}
          </button>
          <button className="custom-submit-btn" type="button" onClick={() => window.history.back()}>
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;

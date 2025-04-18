import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleBuy = async () => {
    if (!address || !mobileNumber) {
      alert("Please provide address and mobile number.");
      return;
    }

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const orders = cartItems.map((item) => ({
      useremail: user.email,
      cake_name: item.name,
      cake_url: item.image,
      cake_price: item.price,
      cake_quan: 1,
      address,
      mobileNumber,
    }));

    setLoading(true);
    try {
      const apiUrl = "https://cake-shop-backend-ecf3.onrender.com//api/orders";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orders),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to place the order.`);
      }

      const data = await response.json();
      const cakeName = cartItems[0]?.name;
      const amount = totalPrice;

      navigate("/orderconfirmation", {
        state: {  amount, cakeName },
      });

      clearCart();
      setAddress("");
      setMobileNumber("");
    } catch (error) {
      alert(`Error placing order: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container" style={{ padding: "20px", backgroundColor: "#FFF0F5" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginRight: "15px",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <p style={{ margin: "5px 0" }}>Price: ₹{item.price}</p>
                </div>
                <button
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "crimson",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3>Total: ₹{totalPrice.toLocaleString("en-IN")}</h3>

          <input
            type="text"
            placeholder="Your name"
            value={user?.name || "Guest"}
            readOnly
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            required
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setMobileNumber(value);
              }
            }}
            style={inputStyle}
          />
          <div>
            <label>Payment Method:</label>
            <select style={inputStyle}>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          <button style={clearButtonStyle} onClick={clearCart}>
            Clear Cart
          </button>

          <button
            style={buyButtonStyle}
            onClick={handleBuy}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </>
      )}
    </div>
  );
};

// Shared input style
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "1px solid #EEC9D2",
  backgroundColor: "#fffafc",
};

// Button styles
const clearButtonStyle = {
  padding: "10px 16px",
  backgroundColor: "#5D3A00",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
  marginRight: "10px",
};

const buyButtonStyle = {
  padding: "10px 16px",
  backgroundColor: "#FF6B81",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

export default Cart;

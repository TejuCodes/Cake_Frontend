import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const PickedUp = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(null);

  // Safe parsing of user data from localStorage
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      console.error("Invalid user data in localStorage", e);
      return null;
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://cake-shop-backend-ecf3.onrender.com/api/orders/user?useremail=${user.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          setError(data.message || "No orders found.");
        }
      } catch (error) {
        console.error("Fetch error:", error.message || error);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      setProcessing(orderId);
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        alert("Failed to delete order: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error.message || error);
      alert("Failed to delete order. Please try again.");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pickedup-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders found.</p>
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-image-container">
                <img
                  src={order.cake_url}
                  alt={order.cake_name}
                  className="order-img"
                  onError={(e) => {
                    e.target.src = "/placeholder-cake.jpg"; // Place a default image in /public
                  }}
                />
              </div>
              <div className="order-details">
                <h3>{order.cake_name}</h3>
                <div className="order-info">
                  <p><strong>Quantity:</strong> {order.cake_quan} kg</p>
                  <p><strong>Price:</strong> ₹{order.cake_price}</p>
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Delivery Address:</strong></p>
                  <p className="address-text">{order.address}</p>
                </div>
                <button
                  className={`delete-btn ${processing === order._id ? "processing" : ""}`}
                  onClick={() => handleDeleteOrder(order._id)}
                  disabled={processing === order._id}
                >
                  {processing === order._id ? (
                    <>
                      <span className="spinner-small"></span> Deleting...
                    </>
                  ) : (
                    "Delete Order"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickedUp;

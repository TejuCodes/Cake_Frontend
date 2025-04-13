import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure CSS file contains fade-out animation

const Success = () => {
  const navigate = useNavigate();
  const [boxVisible, setBoxVisible] = useState(true);

  useEffect(() => {
    // Remove the box after 2 seconds (animation effect)
    const boxTimeout = setTimeout(() => {
      setBoxVisible(false);
    }, 2000);

    // Redirect to home page after 5 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Cleanup timeouts to prevent memory leaks
    return () => {
      clearTimeout(boxTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="success-container">
      <h2>Your Order is Confirmed! ✅</h2>
      <h5>We'll send you a shipping confirmation email as soon as your order ships.</h5>
      <p>Redirecting to home page in 5 seconds...</p>

      {/* Show a fading-out box before it disappears */}
      {boxVisible && <div className="success-box">📦 Order is being processed...</div>}

      {/* Optional: Add a loader animation */}
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Success;

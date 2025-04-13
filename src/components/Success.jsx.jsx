import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [boxVisible, setBoxVisible] = useState(true);

  useEffect(() => {
    const boxTimeout = setTimeout(() => {
      setBoxVisible(false);
    }, 2000);

    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearTimeout(boxTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    fontSize: "2rem",
    color: "#2d862d",
    marginBottom: "10px",
  };

  const subHeadingStyle = {
    fontSize: "1rem",
    color: "#333",
    maxWidth: "500px",
    marginBottom: "15px",
  };

  const paragraphStyle = {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "20px",
  };

  const boxStyle = {
    backgroundColor: "#e6ffe6",
    padding: "15px 25px",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#006600",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    animation: "fadeOut 2s forwards",
  };

  const spinnerStyle = {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTop: "4px solid #2d862d",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Your Order is Confirmed! ✅</h2>
      <h5 style={subHeadingStyle}>
        We'll send you a shipping confirmation email as soon as your order ships.
      </h5>
      <p style={paragraphStyle}>Redirecting to home page in 5 seconds...</p>

      {boxVisible && <div style={boxStyle}>📦 Order is being processed...</div>}

      <div style={spinnerStyle}></div>

      {/* Inline keyframe animations */}
      <style>
        {`
          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; display: none; }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 600px) {
            h2 {
              font-size: 1.5rem !important;
            }
            h5 {
              font-size: 0.9rem !important;
            }
            p {
              font-size: 0.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Success;

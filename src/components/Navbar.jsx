import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      handleLogout();
      navigate("/auth");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h4 className="navbar-title">Welcome Back, {user ? user.name : "Guest"} 🥰</h4>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${menuOpen ? "open" : ""}`}></span>
        </button>

        {/* Navbar Menu */}
        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <ul className="navbar-nav">
            {user ? (
              <div style={{ display: "flex" }}>
                <div>
                  <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                </div>
                <div>
                  <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                </div>
                <div>
                  <li className="nav-item"><Link className="nav-link" to="/pickedup">Orders</Link></li>
                </div>
                <div>
                  <li className="nav-item"><Link className="nav-link" to="/cart"> Cart</Link></li>
                </div>
                <div>
                  <li className="nav-item">
                    <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
                  </li>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <div>
                  <li className="nav-item"><Link className="nav-link" to="/auth">Login / Register</Link></li>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

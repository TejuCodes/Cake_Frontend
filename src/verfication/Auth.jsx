import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const navigate = useNavigate();

  const [user, setUserState] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setUserState({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user.email || !user.password || (!isLogin && !user.name)) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const url = isLogin
        ? "https://cake-shop-backend-ecf3.onrender.com/api/auth/login"  
        : "https://cake-shop-backend-ecf3.onrender.com/api/auth/register";

      const response = await axios.post(url, user);

      if (isLogin) {
        // Handle successful login
        if (response.data.token && response.data.user) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigate("/home");
        }
      } else {
        // Handle successful registration
        setIsLogin(true);
        setUserState({ name: "", email: "", password: "" });
        setError("Registration successful! Please login.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="mainda">
    <div className="auth-container">
      <div className="wrapper">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
              />
              <label>Name</label>
            </div>
          )}
          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
          <p className="error-message">{error}</p>
          <p onClick={toggleMode} className="auth-toggle">
            {isLogin
              ? "Don't have an account? Register here."
              : "Already have an account? Login here."}
          </p>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Auth;

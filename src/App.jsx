import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Auth from "../src/verfication/Auth.jsx";
import Navbar from "../src/components/Navbar";
import Home from "./Home";
import Cake from "../src/components/Cakes";
import About from "../src/components/About";
import PickedUp from "../src/components/PickedUp.jsx";
import Cart from "../src/components/Cart.jsx";
import OrderConfirmation from "../src/components/OrderConfirmation.jsX";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const ProtectedUserRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/cakes" element={<Cake />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/pickedup"
          element={<ProtectedUserRoute>
              <PickedUp />
            </ProtectedUserRoute>
          }
        />
                <Route
          path="/cart"
          element={
            <ProtectedUserRoute>
              <Cart />
            </ProtectedUserRoute>
          }
        />
                  <Route
          path="/orderconfirmation"
          element={
            <ProtectedUserRoute>
              <OrderConfirmation/>
            </ProtectedUserRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;

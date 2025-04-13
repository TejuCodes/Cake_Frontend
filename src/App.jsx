import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Auth from "../src/verfication/Auth.jsx";
import Navbar from "../src/components/Navbar";
import Home from "./Home";
import Order from "../src/components/Order";
import Cake from "../src/components/Cakes";
import About from "../src/components/About";
import Payments from "../src/components/Payments .jsx";
import Success from "../src/components/Success.jsx";
import PickedUp from "../src/components/PickedUp.jsx";

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
          element={
            <ProtectedUserRoute>
              <PickedUp />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedUserRoute>
              <Order />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedUserRoute>
              <Payments />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedUserRoute>
              <Success />
            </ProtectedUserRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

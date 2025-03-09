import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import TariffCalculator from "../tariff_calculator/TariffCalculator";

import logo from "../assets/logo.png";

import "./../css/App.css";

// Firebase components
import Login from "../components/login";
import Register from "../components/register";
import Profile from "../components/profile";

// Toast for Firebase notifications
import { ToastContainer } from "react-toastify";

// Firebase auth
import { auth } from "../components/firebase";

// Layout component to dynamically change the background
const Layout = ({ children }) => {
  const location = useLocation();
  const isTariffPage = location.pathname === "/tariff-calculator";

  return (
    <div className={isTariffPage ? "min-h-screen w-full bg-custom-peach" : "min-h-screen w-full bg-white"}>
      {isTariffPage && (
        <img 
          src={logo}
          alt="logo"
          className="absolute top-4 left-4 w-auto h-auto"
        />
      )}
      {children}
    </div>
  );
};

function App() {
  // Firebase authentication state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <Router>
      <Layout>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
                <Route path="/tariff-calculator" element={<TariffCalculator />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
      </Layout>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import TariffCalculator from "../tariff_calculator/TariffCalculator";
import BusinessInfoForm from './BusinessInfoForm'

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
import Homepage from "../components/homepage";

import Lookup from "./Lookup";

// Authentication
import { AuthProvider, useAuth } from "../database/AuthContext.jsx"; // Import the AuthProvider
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
    <AuthProvider>
      <Router>
        {/* <Layout>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/tariff-calculator" element={<TariffCalculator />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <ToastContainer />
              </div>
            </div>
          </div>
        </Layout> */}
        <div className="App">
        <div className="auth-wrapper">
        <div className="auth-inner">
          
          <Routes>
            {/* <Route
              path="/"
              element={user ? <Navigate to="/profile" /> : <Login />} /> */}

            <Route path="/" element={<Homepage />} />
            {/* Define a route for the TariffCalculator component */}
            <Route path="/tariff-calculator" element={<TariffCalculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedProfileRoute />} />
            <Route path="/business-info-form" element={<ProtectedRoute />} />
            <Route path="/lookup" element={<Lookup />} />
          </Routes>
          <ToastContainer/>
        </div>
        </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// ProtectedRoute for Profile page
function ProtectedProfileRoute() {
  const { user } = useAuth(); // Get user from AuthProvider

  return user ? (
    <Profile userId={user.uid} />
  ) : (
    <Navigate to="/profile" />
  );
}

function ProtectedRoute() {
  const { user } = useAuth(); // Get user from AuthProvider

  return user ? (
    <BusinessInfoForm userId={user.uid} />
  ) : (
    <Navigate to="/login" />
  );
}

export default App;

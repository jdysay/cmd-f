import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TariffCalculator from "../tariff_calculator/TariffCalculator";
import BusinessInfoForm from './BusinessInfoForm';

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
import { AuthProvider, useAuth } from "../database/AuthContext.jsx"; 
import Layout from '../layouts/Layouts'; 

function App() {
  // Firebase authentication state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                {/* Route without Layout */}
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Apply Layout only to these pages */}
                <Route element={<Layout />}>
                  <Route path="/tariff-calculator" element={<TariffCalculator />} />
                  <Route path="/profile" element={<ProtectedProfileRoute />} />
                  <Route path="/business-info-form" element={<ProtectedRoute />} />
                  <Route path="/lookup" element={<Lookup />} />
                </Route>
              </Routes>
              <ToastContainer />
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
    <Navigate to="/login" />
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

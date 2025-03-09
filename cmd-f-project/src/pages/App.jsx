import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TariffCalculator from "../tariff_calculator/TariffCalculator";
import BusinessInfoForm from './BusinessInfoForm';
import Layout from "../layouts/Layouts";
import Navbar from "../components/navbar.jsx";

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
import Lookup from "../components/Lookup.jsx";

// Authentication
import { AuthProvider, useAuth } from "../database/AuthContext.jsx"; 

// Import the Mission component
import Mission from "../components/mission"; 

// Custom hook to change body background color
function useBodyBackground(color) {
  useEffect(() => {
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [color]);
}

// Higher-Order Component to handle background color logic
function WithBackground({ Component, color }) {
  useBodyBackground(color);
  return <Component />;
}

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
        <Layout>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
            <Navbar/>
              <Routes>
                {/* Route without Layout */}
                <Route path="/" element={<WithBackground Component={Homepage} color="#1b0000" />} />
                <Route path="/login" element={<WithBackground Component={Login} color="#FDEBE5" />} />
                <Route path="/register" element={<WithBackground Component={Register} color="#FDEBE5" />} />
                <Route path="/tariff-calculator" element={<WithBackground Component={TariffCalculator} color="#FDEBE5" />} />
                <Route path="/profile" element={<ProtectedProfileRoute />} />
                <Route path="/business-info-form" element={<ProtectedRoute />} />
                <Route path="/lookup" element={<WithBackground Component={Lookup} color="#FDEBE5" />} />
                <Route path="/mission" element={<WithBackground Component={Mission} color="#FDEBE5" />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </div>
        </Layout>
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

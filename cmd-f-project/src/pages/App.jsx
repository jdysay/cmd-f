import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
    <Router>
      <Layout> {/* Wrap all routes inside Layout */}
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/tariff-calculator" element={<TariffCalculator />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/business-info-form" element={<BusinessInfoForm />} />
                <Route path="/lookup" element={<Lookup />} />
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

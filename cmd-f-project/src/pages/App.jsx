import React, { useEffect } from "react";
import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TariffCalculator from "../tariff_calculator/TariffCalculator";
import BusinessInfoForm from './BusinessInfoForm'

import './../css/App.css'

// firebase components

import Login from "../components/login";

import Register from '../components/register';
import Profile from "../components/profile";

// toast components needed for firebase
import { ToastContainer } from "react-toastify";

// more stuff for firebase
import { auth } from "../components/firebase";
import Homepage from "../components/homepage";

import Lookup from "./Lookup";

// Authentication
import { AuthProvider, useAuth } from "../database/AuthContext.jsx"; // Import the AuthProvider

function App() {

  // firebase 
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  // });
  // firebase end

  // const { userFb } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <div className="auth-wrapper">
        <div className="auth-inner">
          
          <Routes>
            {/* <Route
              path="/"
              element={user ? <Navigate to="/profile" /> : <Login />} /> */}

            <Route path="/" element={<Homepage />} />
            {/* Change root path to this in the future? */}
            <Route path="/lookup" element={<Lookup />} />
            {/* Define a route for the TariffCalculator component */}
            <Route path="/tariff-calculator" element={<TariffCalculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/business-info-form"
              element={<ProtectedRoute />}
            />
          </Routes>
          <ToastContainer/>
        </div>
        </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

function ProtectedRoute() {
  const { user } = useAuth(); // Get user from AuthProvider

  return user ? (
    <BusinessInfoForm userEmail={user.uid} />
  ) : (
    <Navigate to="/login" />
  );
}

export default App;

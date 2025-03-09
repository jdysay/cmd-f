import React, { useEffect } from "react";
import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TariffCalculator from "../tariff_calculator/TariffCalculator";


import './../css/App.css'

// firebase components

import Login from "../components/login";

import Register from '../components/register';
import Profile from "../components/profile";

// toast components needed for firebase
import { ToastContainer } from "react-toastify";

// more stuff for firebase
import { auth } from "../components/firebase";


function App() {

  // firebase 
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  // firebase end

  return (
    <Router>
      <div className="App">
      <div className="auth-wrapper">
      <div className="auth-inner">
        
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" /> : <Login />} />

          {/* Define a route for the TariffCalculator component */}
          <Route path="/tariff-calculator" element={<TariffCalculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer/>
      </div>
      </div>
      </div>
    </Router>
  )
}

export default App;

// src/components/LoginLayout.js
import React from 'react';

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {/* Main Login Wrapper */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        
        {/* Header Section */}
        <div className="mb-6 text-center">
          <img src="/path-to-logo.png" alt="Logo" className="mx-auto mb-4 h-12" />
          <h1 className="text-3xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600">Please login to continue</p>
        </div>

        {/* Children (i.e., the login form content) */}
        <div className="login-inner">
          {children}
        </div>

        {/* Footer Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
          <p className="mt-2">© 2025 Your Company</p>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;

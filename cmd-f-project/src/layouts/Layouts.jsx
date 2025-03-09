import React from "react";
import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation(); // Get the current location (URL)

  return (
    <div>
      {children}

      {/* Sticky Button */}
      {location.pathname === "/tariff-calculator" ? (
        <Link to="/">
          <button className="sticky-button">Back to Home</button>
        </Link>
      ) : (
        <Link to="/tariff-calculator">
          <button className="sticky-button">Tariff Calculator</button>
        </Link>
      )}
    </div>
  );
}

export default Layout;

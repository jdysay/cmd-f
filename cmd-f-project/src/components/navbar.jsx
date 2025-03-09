import React from "react";
import { Link } from "react-router-dom";
import { Button } from './button';
import "../css/Homepage.css";

function Navbar() {
  return (
    <nav className="w-full py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Left side - Logo with Link */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-[#543B75] text-xl font-[Caprasimo], cursive">Maple Market</h1>
          </Link>
        </div>

        {/* Right side - Login & Signup */}
        <div className="flex space-x-4">
          <Link to="/login">
            <Button size="sm" variant="solid" className="rounded-full">
              Login
            </Button>
          </Link>

          <Link to="/register">
            <Button size="sm" variant="solid" className="rounded-full">
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

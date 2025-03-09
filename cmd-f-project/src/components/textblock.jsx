import "../css/Homepage.css";
import React from 'react';
import Navbar from "./navbar";
import Button from "./button";
import { Link } from "react-router-dom"; // ✅ Correct Import of Link

function TextBlock() {
  return (
    <div id="textblock">
      <div id="textblock-container">
        <div id="more-space">
          <h1 id="textblock-title">About Maple Market</h1>
          <br />
          <p id="textblock-content">
            Maple Market is a digital platform built using modern web technologies to connect
            Canadian businesses with consumers. It features an intuitive user interface, making
            it simple for businesses to sign up, create profiles, and list their products. For
            consumers, the platform provides a fast search functionality powered by efficient
            indexing, ensuring they can easily find local, Canadian-made products.
          </p>
          <br />
          <br />

          {/* Buttons Section */}
          <div className="button-container">
            <Link to="/lookup">
              <Button size="lg" variant="solid" className="mr-4">
                Explore
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="solid" className="mr-4">
                Sell
              </Button>
            </Link>
          </div>

          <div className="button-container">
            <Link to="/mission">  {/* ✅ Wrapped 'Our Mission' button with Link */}
              <Button size="lg" variant="solid" className="mr-4">
                Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextBlock;

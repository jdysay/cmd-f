import React from 'react';

// Header Component
const Header = () => (
  <header>
    <h1>Welcome to My Homepage</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
);

// Main Content Section
const MainContent = () => (
  <section id="home">
    <h2>Discover Awesome Content</h2>
    <p>This is the homepage where we showcase interesting content and information.</p>
    <button>Learn More</button>
  </section>
);

// About Section
const About = () => (
  <section id="about">
    <h2>About Us</h2>
    <p>We are a team dedicated to bringing you great content and experiences. Stay tuned for more!</p>
  </section>
);

// Contact Section
const Contact = () => (
  <section id="contact">
    <h2>Contact Us</h2>
    <p>Feel free to reach out with any questions or feedback!</p>
    <button>Contact</button>
  </section>
);

// Footer Component
const Footer = () => (
  <footer>
    <p>&copy; 2025 My Website. All rights reserved.</p>
  </footer>
);

// Main Homepage Component
const Homepage = () => (
  <div>
    <Header />
    <MainContent />
    <About />
    <Contact />
    <Footer />
  </div>
);

export default Homepage;

import "../css/Homepage.css";
import Navbar from "./navbar";
import Button from "./button";

function TextBlock() {
  return (
    <div id="textblock">
      <div id="textblock-container">

        <div id="more-space">
        <h1 id="textblock-title">About Maple Market</h1>
        <br></br>
        <p id="textblock-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
        <br></br>
        <br></br>
        


        {/* Buttons Section */}
        <div className="button-container">
          <Button size="lg" variant="solid" className="mr-4">
            Explore
          </Button>
          <Button size="lg" variant="solid" className="mr-4">
            Sell
          </Button>
        </div>
      </div>

      </div>
      


      <footer id="textblock-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-heading">Maple Market</h3>
            <p className="footer-description">
              Connecting local producers with conscious consumers for sustainable shopping.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Useful Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Explore</a>
              </li>
              <li>
                <a href="#">Sell</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Creators</h3>
            <p className="footer-creators">Mara, Bianca, Jennifer, and Jaycie at cmd-f 2025</p>
          </div>
        </div>

        <div className="footer-copyright">&copy; 2025 Maple Market. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default TextBlock;

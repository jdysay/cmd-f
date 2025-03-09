import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; 
import moose from "../assets/moose.png"

const Layout = ({ children }) => {
  const location = useLocation();
  const isTariffPage = location.pathname === "/tariff-calculator";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div
      className={
        isTariffPage || isAuthPage
          ? "min-h-screen w-full bg-custom-peach bg-cover bg-center relative"
          : "min-h-screen w-full bg-custom-peach bg-cover bg-center relative"
      }
    >
      {/* Background Image */}
      <img 
        src={moose}
        alt="moose"
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
      
      {/* Content Div */}
      <div className="absolute inset-y-0 right-0 w-3/4 bg-white z-10">
        {isTariffPage && (
          <img 
            src={logo}
            alt="logo"
            className="absolute top-4 left-4 w-auto h-auto z-20"
          />
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Layout;

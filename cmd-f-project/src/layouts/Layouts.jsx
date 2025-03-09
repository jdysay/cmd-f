import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; 
import moose from "../assets/moose.png"

const Layout = ({ children }) => {
  const location = useLocation();
  const isTariffPage = location.pathname === "/tariff-calculator";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen w-full bg-cover bg-center relative bg-custom-peach">
      {/* Background Image */}
      <img 
        src={moose}
        alt="moose"
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />
  
      {/* Logo - Appears on all pages */}
      <img 
        src={logo}
        alt="logo"
        className="absolute top-4 left-4 w-auto h-auto z-10"
      />
  
      {/* Main Content Div (Peach for Tariff, White for Auth) */}
      <div 
        className={`absolute inset-y-0 right-0 w-3/4 ${
          isTariffPage ? "bg-custom-peach" : isAuthPage ? "bg-white" : "bg-gray-100"
        } z-10`}
      >
        {children}
      </div>
    </div>
  );
  
  
  
};  
export default Layout;

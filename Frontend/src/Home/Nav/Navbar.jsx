import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Profile from "../Profile/profile.jsx";
import WardSelector from "../Component/wadaselector.jsx";
import Notification from "../Component/Notification.jsx";
import UserMenu from "../Component/UserMenu.jsx";
import HeroSection from "../Pages/HeroSection.jsx";
import Status from "../Pages/Status.jsx";
import { useWard } from "../Context/WardContext.jsx";

const Navbar = ({ showHomeContent = false }) => {
  const { municipality, ward } = useWard();
  const selectedMuni = useMemo(
    () =>
      municipality && ward
        ? `${municipality} - Ward ${ward}`
        : "Select Municipality",
    [municipality, ward]
  );

  return (
    <div className="app">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <Link to="/" className="logo">
            Ward Portal
          </Link>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="navbar-center">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/documents" className="nav-link">
            Documents
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>

        {/* Right Section - Ward Selector, Notification, User Menu */}
        <div className="navbar-right">
          <WardSelector />
          <Notification />
          <UserMenu />
        </div>
      </nav>

      {/* Main Content - Only shown if showHomeContent is true */}
      {showHomeContent && (
        <>
          <main className="main-content">
            <HeroSection selectedMuni={selectedMuni} />
            <Status />
          </main>
          <Profile />
        </>
      )}
    </div>
  );
};

export default Navbar;

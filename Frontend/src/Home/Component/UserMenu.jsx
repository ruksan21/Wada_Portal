import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./UserMenu.css";

const UserMenu = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  // If not logged in, show login button
  if (!isLoggedIn) {
    return (
      <Link to="/login" className="login-btn">
        Login
      </Link>
    );
  }

  // If logged in, show user menu
  return (
    <div className="user-menu-container">
      <button className="user-avatar-btn" onClick={toggleMenu}>
        {user?.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={user.name}
            className="user-avatar-img"
          />
        ) : (
          <span className="user-avatar">👤</span>
        )}
        <span className="user-name">{user?.name || user?.email}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="user-menu-overlay" onClick={toggleMenu}></div>
          <div className="user-menu-dropdown">
            {/* User Info Section */}
            <div className="user-info-section">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="user-avatar-large-img"
                />
              ) : (
                <div className="user-avatar-large">👤</div>
              )}
              <div className="user-details">
                <h3>{user?.name || user?.email}</h3>
                <p className="user-role">{user?.role || "User"}</p>
                <p className="user-location">
                  {user?.ward &&
                    user?.municipality &&
                    `${user.ward}, ${user.municipality}`}
                </p>
              </div>
            </div>

            <div className="menu-divider"></div>

            {/* Menu Items */}
            <div className="menu-items">
              <Link to="/profile" className="menu-item" onClick={toggleMenu}>
                <span className="menu-icon">👤</span>
                <span>My Profile</span>
              </Link>

              <Link to="/settings" className="menu-item" onClick={toggleMenu}>
                <span className="menu-icon">⚙️</span>
                <span>Settings</span>
              </Link>

              {/* Role-based Panels */}
              {user?.role === "officer" && (
                <Link to="/officer" className="menu-item" onClick={toggleMenu}>
                  <span className="menu-icon">👮</span>
                  <span>Officer Panel</span>
                </Link>
              )}
              {user?.role === "admin" && (
                <Link to="/admin" className="menu-item" onClick={toggleMenu}>
                  <span className="menu-icon">🛡️</span>
                  <span>Admin Panel</span>
                </Link>
              )}

              <Link to="/help" className="menu-item" onClick={toggleMenu}>
                <span className="menu-icon">❓</span>
                <span>Help & Support</span>
              </Link>
            </div>

            <div className="menu-divider"></div>

            {/* Logout */}
            <button className="menu-item logout-item" onClick={handleLogout}>
              <span className="menu-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;

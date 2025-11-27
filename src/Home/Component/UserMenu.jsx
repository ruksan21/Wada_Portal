import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // यो भविष्यमा authentication state बाट आउनेछ
  const [user, setUser] = useState({
    name: "राम बहादुर",
    role: "Ward Chairperson",
    ward: "Ward 5",
    municipality: "Kathmandu",
    avatar: "👤",
    isLoggedIn: true, // यो authentication बाट controlled हुनेछ
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // भविष्यमा यहाँ logout API call हुनेछ
    console.log("Logging out...");
    setUser({ ...user, isLoggedIn: false });
    setIsOpen(false);
  };

  // If not logged in, show login button
  if (!user.isLoggedIn) {
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
        <span className="user-avatar">{user.avatar}</span>
        <span className="user-name">{user.name}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <>
          <div className="user-menu-overlay" onClick={toggleMenu}></div>
          <div className="user-menu-dropdown">
            {/* User Info Section */}
            <div className="user-info-section">
              <div className="user-avatar-large">{user.avatar}</div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p className="user-role">{user.role}</p>
                <p className="user-location">
                  {user.ward}, {user.municipality}
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

              <Link to="/dashboard" className="menu-item" onClick={toggleMenu}>
                <span className="menu-icon">📊</span>
                <span>Dashboard</span>
              </Link>

              <Link to="/settings" className="menu-item" onClick={toggleMenu}>
                <span className="menu-icon">⚙️</span>
                <span>Settings</span>
              </Link>

              <Link
                to="/notifications"
                className="menu-item"
                onClick={toggleMenu}
              >
                <span className="menu-icon">🔔</span>
                <span>All Notifications</span>
              </Link>

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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import profile from './assests/user-profile.jpg';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUserProfileClick = () => {
    navigate('/profile', { state: { user } }); // Navigate to the user profile page
    setShowDropdown(false); // Close the dropdown
  };

  const handleLogoutClick = () => {
    onLogout(); // Trigger the logout function
    setShowDropdown(false); // Close the dropdown
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <header className="success-header">
      <h1 className="main-heading">EVENTSPHERE</h1>
      <nav className="navigation-menu">
        <ul>
          <li onClick={() => navigate('/main')}>Home</li>
          <li onClick={() => navigate('/calendar')}>Calendar</li>
          <li onClick={() => navigate('/events')}>Events</li>
          <li onClick={() => navigate('/achievements')}>Achievements</li>
          <li>Notifications</li>
        </ul>
      </nav>
      <div className="user-profile" onClick={toggleDropdown}>
        <img src={user?.profileImage || profile} alt="User Profile" className="user-profile-image" />
        <span>{user?.name || "USER NAME"}</span>
        {showDropdown && (
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-button" onClick={handleUserProfileClick}>
                User Profile
              </button>
            </li>
            <li>
              <button className="dropdown-button" onClick={handleLogoutClick}>
                Log Out
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;

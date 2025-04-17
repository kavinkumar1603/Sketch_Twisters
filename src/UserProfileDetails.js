import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Import the CSS for styling

const UserProfileDetails = ({ user, onLogout }) => { // Accept user and onLogout as props
  const navigate = useNavigate(); // Initialize useNavigate

  const [profile, setProfile] = useState({
    name: user?.name || '',
    rollNo: user?.id || '',
    password: '',
    email: user?.email || '',
    language: 'English',
    role: user?.role || 'Student',
  });

  const [isEditing, setIsEditing] = useState(true); // Track editing state

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        rollNo: user.id,
        email: user.email,
        role: user.role,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log('Profile saved:', profile);
    alert('Profile saved successfully!');
    setIsEditing(false); // Disable editing mode
  };

  return (
    <div className="user-profile-page">
      <header className="user-profile-header">
        <h1 className="user-profile-title">EVENTSPHERE</h1>
        <nav className="user-profile-nav">
          <ul>
            <li onClick={() => navigate('/main')}>HOME</li> {/* Use navigate */}
            <li>CALENDAR</li>
            <li>EVENTS</li>
            <li onClick={() => navigate('/achievements')}>ACHIEVEMENTS</li> {/* Use navigate */}
            <li>NOTIFICATION</li>
          </ul>
        </nav>
        <div className="user-profile">
          <span>{user?.name || "USER NAME"}</span> {/* Display user's name */}
          <button className="logout-button" onClick={onLogout}>LOGOUT</button> {/* Logout button */}
        </div>
      </header>
      <main className="user-profile-content">
        <form className="user-profile-form">
          <h3 className="form-section-title">Basic Details</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={handleInputChange}
              className="profile-input"
              disabled={!isEditing} // Disable input if not editing
            />
          </div>
          <div className="form-group">
            <label htmlFor="rollNo">Roll Number</label>
            <input
              type="text"
              id="rollNo"
              value={profile.rollNo}
              onChange={handleInputChange}
              className="profile-input"
              disabled={!isEditing} // Disable input if not editing
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password {profile.password && `(Entered: ${profile.password})`}
            </label>
            <input
              type="password"
              id="password"
              value={profile.password}
              onChange={handleInputChange}
              className="profile-input"
              disabled={!isEditing} // Disable input if not editing
            />
          </div>
          {profile.role === 'Student' && (
            <>
              <h3 className="form-section-title">Student Details</h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="form-group">
                <label htmlFor="language">Preferred Language</label>
                <select
                  id="language"
                  value={profile.language}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled={!isEditing} // Disable input if not editing
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
            </>
          )}
          {profile.role === 'Teacher' && (
            <>
              <h3 className="form-section-title">Teacher Details</h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  type="text"
                  id="department"
                  value={profile.department || ''}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
            </>
          )}
          {profile.role === 'Admin' && (
            <>
              <h3 className="form-section-title">Admin Details</h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled={!isEditing} // Disable input if not editing
                />
              </div>
              <div className="form-group">
                <label htmlFor="accessLevel">Access Level</label>
                <select
                  id="accessLevel"
                  value={profile.accessLevel || 'Full'}
                  onChange={handleInputChange}
                  className="profile-input"
                  disabled={!isEditing} // Disable input if not editing
                >
                  <option value="Full">Full</option>
                  <option value="Limited">Limited</option>
                </select>
              </div>
            </>
          )}
        </form>
      </main>
    </div>
  );
};

export default UserProfileDetails;

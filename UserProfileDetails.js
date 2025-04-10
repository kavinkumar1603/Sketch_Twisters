import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function UserProfileDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated user details:", editableUser);
    setIsEditing(false);
  };

  return (
    <div className="profile-details-screen">
      <h2>User Profile</h2>
      <div className="profile-details-container">
        {isEditing ? (
          <>
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>ID:</strong>
              <input
                type="text"
                name="id"
                value={editableUser.id}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Role:</strong>
              <input
                type="text"
                name="role"
                value={editableUser.role}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleInputChange}
              />
            </label>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {editableUser.name}</p>
            <p><strong>ID:</strong> {editableUser.id}</p>
            <p><strong>Role:</strong> {editableUser.role}</p>
            <p><strong>Email:</strong> {editableUser.email}</p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </>
        )}
      </div>
      <button className="back-button" onClick={() => navigate("/main")}>
        Back to Main
      </button>
    </div>
  );
}

export default UserProfileDetails;

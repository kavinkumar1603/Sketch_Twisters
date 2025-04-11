import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function UserProfileDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {}; // Ensure user details are passed correctly
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(user);
  const [savedUser, setSavedUser] = useState(user); // Store saved user details

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!editableUser.id) {
      alert("ID cannot be empty!"); // Validate ID field
      return;
    }
    console.log("Updated user details:", editableUser);
    setSavedUser(editableUser); // Save the updated details
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-avatar">
          <img
            src="https://via.placeholder.com/150" // Placeholder avatar
            alt="User Avatar"
            className="avatar-image"
          />
        </div>
        <div className="profile-details">
          {isEditing ? (
            <>
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  name="name"
                  value={editableUser.name || ""}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                <strong>ID:</strong>
                <input
                  type="text"
                  name="id"
                  value={editableUser.id || ""}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                <strong>Role:</strong>
                <input
                  type="text"
                  name="role"
                  value={editableUser.role || ""}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={editableUser.email || ""}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                <strong>Phone Number:</strong>
                <input
                  type="text"
                  name="phone"
                  value={editableUser.phone || ""}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <label>
                <strong>Address:</strong>
                <input
                  type="text"
                  name="address"
                  value={editableUser.address || ""}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              </label>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {savedUser.name}</p>
              <p><strong>ID:</strong> {savedUser.id || "Not Provided"}</p>
              <p><strong>Role:</strong> {savedUser.role}</p>
              <p><strong>Email:</strong> {savedUser.email}</p>
              <p><strong>Phone Number:</strong> {savedUser.phone || "Not Provided"}</p>
              <p><strong>Address:</strong> {savedUser.address || "Not Provided"}</p>
              {(savedUser.role === "admin" || savedUser.role === "Teacher") && (
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              )}
            </>
          )}
        </div>
        <button className="back-button" onClick={() => navigate("/main")}>
          Back to Main
        </button>
      </div>
    </div>
  );

}

export default UserProfileDetails;

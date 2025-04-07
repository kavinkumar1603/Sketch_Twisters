import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function UserProfileDetails({ user }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editableUser, setEditableUser] = useState(user || {}); // State for editable user details
  const [errors, setErrors] = useState({}); // State for validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear error for the field being edited
    }));
  };

  const handleSave = () => {
    const newErrors = {};
    if (!editableUser.name) newErrors.name = "This field is required.";
    if (!editableUser.id) newErrors.id = "This field is required.";
    if (!editableUser.role) newErrors.role = "This field is required.";
    if (!editableUser.email) newErrors.email = "This field is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set validation errors
      return; // Stop saving if there are errors
    }

    console.log("Updated user details:", editableUser); // Log updated details
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="profile-details-screen">
      <h2>User Profile</h2>
      <div className="profile-details-container">
        {editableUser.role === "student" ? ( // Show form only for students
          isEditing ? (
            <>
              <label className="form-group">
                <strong>Name:</strong>
                <input
                  type="text"
                  name="name"
                  value={editableUser.name || ""}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </label>
              <label className="form-group">
                <strong>ID:</strong>
                <input
                  type="text"
                  name="id"
                  value={editableUser.id || ""}
                  onChange={handleInputChange}
                />
                {errors.id && <p className="error-message">{errors.id}</p>}
              </label>
              <label className="form-group">
                <strong>Role:</strong>
                <input
                  type="text"
                  name="role"
                  value={editableUser.role || ""}
                  onChange={handleInputChange}
                />
                {errors.role && <p className="error-message">{errors.role}</p>}
              </label>
              <label className="form-group">
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={editableUser.email || ""}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
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
          )
        ) : (
          <p>Registration is only available for students.</p> // Message for non-students
        )}
      </div>
      <button className="back-button" onClick={() => navigate("/main")}>
        Back to Main
      </button>
    </div>
  );
}

export default UserProfileDetails;

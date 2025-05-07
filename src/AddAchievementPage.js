import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const AddAchievementPage = ({ onAddAchievement, user, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    collegeName: '',
    organizerName: '',
    achievement: '',
    description: '',
    photo: null,
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddAchievement) {
      onAddAchievement(formData);
    }
    navigate('/achievements');
  };

  return (
    <div className="add-achievement-content">
      <h2 className="add-achievement-section-title">New Achievement</h2>
      <form className="add-achievement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName">Enter Event Name <span>*</span></label>
          <input
            type="text"
            id="eventName"
            placeholder="Enter Event Name"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Select Event Type <span>*</span></label>
          <select
            id="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Event Type</option>
            <option value="On-Campus">On-Campus</option>
            <option value="Off-Campus">Off-Campus</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="collegeName">If Off-Campus Enter College Name</label>
          <input
            type="text"
            id="collegeName"
            placeholder="Enter College Name"
            value={formData.collegeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizerName">If General Enter Industry or Event Organizer Name</label>
          <input
            type="text"
            id="organizerName"
            placeholder="Enter Industry or Event Organizer Name"
            value={formData.organizerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="achievement">Enter Your Achievement <span>*</span></label>
          <input
            type="text"
            id="achievement"
            placeholder="Enter Achievement"
            value={formData.achievement}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Enter Description for the Event <span>*</span></label>
          <textarea
            id="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Upload Photo <span>*</span></label>
          <input
            type="file"
            id="photo"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="add-achievement-submit-button">UPLOAD ACHIEVEMENT</button>
      </form>
    </div>
  );
};

export default AddAchievementPage;

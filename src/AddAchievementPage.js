import React from 'react';
import './App.css'; // Import the CSS for styling

const AddAchievementPage = () => {
  return (
    <div className="add-achievement-page">
      <header className="add-achievement-header">
        <h1 className="add-achievement-title">EVENTSPHERE</h1>
        <nav className="add-achievement-nav">
          <ul>
            <li>HOME</li>
            <li>CALENDAR</li>
            <li>EVENTS</li>
            <li>ACHIEVEMENTS</li>
            <li>NOTIFICATION</li>
          </ul>
        </nav>
        <div className="user-profile">
          <span>USER NAME</span>
        </div>
      </header>
      <main className="add-achievement-content">
        <h2 className="add-achievement-section-title">🏅 Add Your Achievement</h2>
        <p className="add-achievement-description">
          Share your success story and inspire others! Fill out the form below to add your achievement to the platform.
        </p>
        <form className="add-achievement-form">
          <div className="form-group">
            <label htmlFor="title">Achievement Title</label>
            <input type="text" id="title" placeholder="Enter the title of your achievement" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Describe your achievement"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="proof">Upload Proof</label>
            <input type="file" id="proof" />
          </div>
          <button type="submit" className="add-achievement-submit-button">Submit Achievement</button>
        </form>
      </main>
    </div>
  );
};

export default AddAchievementPage;

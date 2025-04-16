import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Import the CSS for styling

const AchievementsPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddAchievementClick = () => {
    navigate('/add-achievement'); // Navigate to the Add Achievement page
  };

  return (
    <div className="achievements-page">
      <header className="achievements-header">
        <h1 className="achievements-title">EVENTSPHERE</h1>
        <nav className="achievements-nav">
          <ul>
            <li>HOME</li>
            <li>CALENDAR</li>
            <li>EVENTS</li>
            <li className="active">ACHIEVEMENTS</li>
            <li>NOTIFICATION</li>
          </ul>
        </nav>
        <div className="user-profile">
          <span>USER NAME</span>
        </div>
      </header>
      <main className="achievements-content">
        <h2 className="achievements-section-title">TOP ACHIEVEMENTS</h2>
        <div className="achievements-cards">
          <div className="achievement-card">
            <div className="achievement-image" style={{ backgroundImage: 'url(/path/to/image1.jpg)' }}></div>
            <div className="achievement-details">
              <h3>JAISURYA S - 24CS090</h3>
              <p>Won 1st place in the National Coding Championship.</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-image" style={{ backgroundImage: 'url(/path/to/image2.jpg)' }}></div>
            <div className="achievement-details">
              <h3>KAVINKUMAR C - 24CS110</h3>
              <p>Secured 2nd place in the AI Hackathon 2023.</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-image" style={{ backgroundImage: 'url(/path/to/image3.jpg)' }}></div>
            <div className="achievement-details">
              <h3>KANISHKA S - 24CS104</h3>
              <p>Published a research paper in IEEE Xplore.</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-image" style={{ backgroundImage: 'url(/path/to/image4.jpg)' }}></div>
            <div className="achievement-details">
              <h3>KIRITHIKA S - 24CS118</h3>
              <p>Developed an award-winning mobile application.</p>
            </div>
          </div>
        </div>
        <button className="add-achievement-button" onClick={handleAddAchievementClick}>
          + ADD YOUR ACHIEVEMENT
        </button>
        <h2 className="achievements-section-title">ALL ACHIEVEMENTS</h2>
        <div className="all-achievements-cards">
          {[...Array(8)].map((_, index) => (
            <div className="achievement-card" key={index}>
              <div className="achievement-image"></div>
              <div className="achievement-details">
                <h3>Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AchievementsPage;

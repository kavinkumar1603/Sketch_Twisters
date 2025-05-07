import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const AchievementsPage = ({ achievements = [], user, onLogout }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddAchievementClick = () => {
    navigate('/add-achievement');
  };

  return (
    <div className="achievements-content">
      {/* Removed redundant header */}
      <h2 className="achievements-section-title">TOP ACHIEVEMENTS</h2>
      <div className="achievements-cards">
        <div className="achievement-card">
          <div className="card-inner">
            <div className="card-front">
              <div
                className="achievement-image"
                style={{ backgroundImage: 'url(/path/to/image1.jpg)' }}
              ></div>
              <h3>JAISURYA S - 24CS090</h3>
            </div>
            <div className="card-back">
              <p>Won 1st place in the National Coding Championship.</p>
            </div>
          </div>
        </div>
        <div className="achievement-card">
          <div className="card-inner">
            <div className="card-front">
              <div
                className="achievement-image"
                style={{ backgroundImage: 'url(/path/to/image2.jpg)' }}
              ></div>
              <h3>KAVINKUMAR C - 24CS110</h3>
            </div>
            <div className="card-back">
              <p>Secured 2nd place in the AI Hackathon 2023.</p>
            </div>
          </div>
        </div>
        <div className="achievement-card">
          <div className="card-inner">
            <div className="card-front">
              <div
                className="achievement-image"
                style={{ backgroundImage: 'url(/path/to/image3.jpg)' }}
              ></div>
              <h3>KANISHKA S - 24CS104</h3>
            </div>
            <div className="card-back">
              <p>Published a research paper in IEEE Xplore.</p>
            </div>
          </div>
        </div>
        <div className="achievement-card">
          <div className="card-inner">
            <div className="card-front">
              <div
                className="achievement-image"
                style={{ backgroundImage: 'url(/path/to/image4.jpg)' }}
              ></div>
              <h3>KIRITHIKA S - 24CS118</h3>
            </div>
            <div className="card-back">
              <p>Developed an award-winning mobile application.</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="add-achievement-button"
        onClick={handleAddAchievementClick}
      >
        + ADD YOUR ACHIEVEMENT
      </button>
      <h2 className="achievements-section-title">ALL ACHIEVEMENTS</h2>
      <div className="all-achievements-cards">
        {achievements.map((achievement, index) => (
          <div className="achievement-card" key={index}>
            <div className="card-inner">
              <div className="card-front">
                <div
                  className="achievement-image"
                  style={{
                    backgroundImage: `url(${achievement.photo ? URL.createObjectURL(achievement.photo) : ''})`,
                  }}
                ></div>
                <h3>{achievement.eventName}</h3>
              </div>
              <div className="card-back">
                <p>{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;

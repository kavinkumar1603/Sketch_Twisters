import React from 'react';
import './App.css'; // Import the CSS for styling

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      <header className="achievements-header">
        <h1 className="achievements-title">EVENTSPHERE</h1>
        <nav className="achievements-nav">
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
      <main className="achievements-content">
        <h2 className="achievements-section-title">TOP ACHIEVEMENTS</h2>
        <div className="achievements-cards">
          <div className="achievement-card">
            <div className="achievement-image"></div>
            <div className="achievement-details">
              <h3>JAISURYA S - 24CS090</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-image"></div>
            <div className="achievement-details">
              <h3>KAVINKUMAR C - 24CS110</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-image"></div>
            <div className="achievement-details">
              <h3>KANISHKA S - 24CS104</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-image"></div>
            <div className="achievement-details">
              <h3>KIRITHIKA S - 24CS118</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <button className="add-achievement-button">+ ADD YOUR ACHIEVEMENT</button>
        <h2 className="achievements-section-title">ALL ACHIEVEMENTS</h2>
        {/* Add more achievements here */}
      </main>
    </div>
  );
};

export default AchievementsPage;

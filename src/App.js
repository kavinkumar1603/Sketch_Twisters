import React, { useState } from 'react';
import './App.css';
import videoSrc from './assests/logodesign.mp4'; // Ensure the folder name matches the actual directory

function App() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleLoginClick = () => {
    setShowLoginOptions(true);
  };

  const handleOptionClick = (option) => {
    console.log(`Logging in as: ${option}`);
    setShowLoginOptions(false);
    // Add logic for handling login based on the selected option
  };

  return (
    <div className="app-container">
      <h1 className="header-title animated-title slide-left">EVENT SPHERE</h1>
      <h1 className="header-title animated-title slide-left">EVENT SPHERE</h1> 
      <h1 className="header-title event-sphere-text">EVENT SPHERE</h1>
      <h1 className="header-title event-sphere-text">EVENT SPHERE</h1>
      <div className="background-text">SPHERE</div>
      <div className="content">
        <div className="video-container">
          <video className="video" autoPlay muted loop>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="animated-subtitle">EVENT SPHERE</p>
        <p className="animated-subtitle infinite-opportunities-text">EVENT SPHERE</p>
        <div className="description">
          <p>WELCOME TO SECE'S EVENTSPHERE! 🚀</p>
          <p>
            YOUR ALL-IN-ONE HUB FOR EXPLORING EVENTS, WORKSHOPS, HACKATHONS, AND
            SCHOLARSHIPS AT SRI ESHWAR COLLEGE OF ENGINEERING. STAY UPDATED ON
            DEPARTMENTAL, CLUB, CIR, AND GDC EVENTS, REGISTER SEAMLESSLY, AND
            RECEIVE REAL-TIME NOTIFICATIONS VIA WHATSAPP.
          </p>
          <p>📅 DISCOVER. REGISTER. ENGAGE. STAY AHEAD WITH SECE'S EVENTSPHERE! 🎯🔥</p>
        </div>
        <button className="login-button" onClick={handleLoginClick}>
          Log in/Sign up
        </button>
        {showLoginOptions && (
          <div className="login-options-modal">
            <div className="login-options">
              <h2 className="text">Select Login Type</h2>
              <div className="login-options-row">
                <div>
                  <label>Teacher</label>
                  <button onClick={() => handleOptionClick('Teacher')}>Teacher</button>
                </div>
                <div>
                  <label>Student</label>
                  <button onClick={() => handleOptionClick('Student')}>Student</button>
                </div>
                <div>
                  <label>Server</label>
                  <button onClick={() => handleOptionClick('Server')}>Server</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

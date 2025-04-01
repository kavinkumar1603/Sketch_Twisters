import React, { useState } from 'react';
import './App.css';
import videoSrc from './assests/logodesign.mp4'; // Ensure the folder name matches the actual directory
import AdminProfile from './assests/Admin-Profile.png'; // Import Admin profile image
import StudentProfile1 from './assests/Student-profile1.avif'; // Import Student profile image

function App() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLoginClick = () => {
    setShowLoginOptions(true);
  };

  const handleOptionClick = (option) => {
    console.log(`Logging in as: ${option}`);
    setShowLoginOptions(false);
    setSelectedOption(option);
    // Add logic for handling login based on the selected option
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('login-options-modal')) {
      setShowLoginOptions(false);
    }
  };

  const renderModalContent = () => {
    if (selectedOption) {
      // Render dynamic input fields for the selected option
      return (
        <div className="dynamic-input-container">
          {selectedOption === "Teacher" && (
            <>
              <label htmlFor="name">Admin ID</label>
              <input type="text" id="name" placeholder="Enter your name" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </>
          )}
          {selectedOption === "Student" && (
            <>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
              <label htmlFor="student-id">Student ID</label>
              <input type="text" id="student-id" placeholder="Enter your student ID" />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </>
          )}
          <button onClick={() => setShowLoginOptions(false)}>Submit</button>
        </div>
      );
    }

    // Render login options if no option is selected
    return (
      <div className="login-options">
        <h2 className="text">Select Login Type</h2>
        <div className="login-options-row">
          <div className="login-option">
            <img src={AdminProfile} alt="Admin" className="login-option-image" />
            <button 
              className="login-option-button" 
              onClick={() => setSelectedOption("Teacher")}
            >
              Admin
            </button>
          </div>
          <div className="login-option">
            <img src={StudentProfile1} alt="Student" className="login-option-image" />
            <button 
              className="login-option-button" 
              onClick={() => setSelectedOption("Student")}
            >
              Student
            </button>
          </div>
        </div>
      </div>
    );
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
          <div 
            className={`login-options-modal ${showLoginOptions ? '' : 'hidden'}`} 
            onClick={handleOutsideClick}
          >
            {renderModalContent()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

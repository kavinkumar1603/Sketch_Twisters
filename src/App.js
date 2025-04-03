import React, { useState } from 'react';
import './App.css';
import videoSrc from './assests/logodesign.mp4'; // Ensure the folder name matches the actual directory
import AdminProfile from './assests/Admin-Profile.png'; // Import Admin profile image
import StudentProfile1 from './assests/Student-profile1.avif'; // Import Student profile image

function App() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({}); // State to track field errors

  const handleLoginClick = () => {
    setShowLoginOptions(true);
    setSelectedOption(null); // Reset selectedOption to show Admin/Student login options
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleRegisterSubmit = () => {
    const { name, studentId, password, confirmPassword } = registrationDetails;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!studentId) newErrors.studentId = "Student ID is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required.";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate registration success
      console.log("Registration successful:", registrationDetails);
      localStorage.setItem("studentLoggedIn", true); // Save login state
      alert("Registration successful! You can now log in.");
      setShowLoginOptions(false); // Close modal
      setSelectedOption(null); // Reset selectedOption
    }
  };

  const renderModalContent = () => {
    if (selectedOption) {
      const isStudentLoggedIn = selectedOption === "Student" && localStorage.getItem("studentLoggedIn");

      if (selectedOption === "Register") {
        return (
          <div className="register-form-container">
            <h2 className="register-form-title">Create Your Account</h2>
            <p className="register-form-subtitle">Join us and explore amazing opportunities!</p>
            <form className="register-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={registrationDetails.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  placeholder="Enter your student ID"
                  value={registrationDetails.studentId}
                  onChange={handleInputChange}
                />
                {errors.studentId && <p className="error-message">{errors.studentId}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={registrationDetails.password}
                  onChange={handleInputChange}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={registrationDetails.confirmPassword}
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>
              <button
                type="button"
                className="submit-registration-button"
                onClick={handleRegisterSubmit}
              >
                Register
              </button>
            </form>
          </div>
        );
      }

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
              {isStudentLoggedIn ? (
                <>
                  <label htmlFor="student-id">Student ID</label>
                  <input type="text" id="student-id" placeholder="Enter your student ID" />
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter your password" />
                </>
              ) : (
                <>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter your name" />
                  <label htmlFor="student-id">Student ID</label>
                  <input type="text" id="student-id" placeholder="Enter your student ID" />
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" placeholder="Enter your password" />
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input type="password" id="confirm-password" placeholder="Confirm your password" />
                </>
              )}
            </>
          )}
          <button 
            className="dynamic-submit-button" // Updated class name
            onClick={() => {
              if (selectedOption === "Student" && !isStudentLoggedIn) {
                localStorage.setItem("studentLoggedIn", true); // Simulate student login
              }
              setShowLoginOptions(false); // Close modal
              setSelectedOption(null); // Reset selectedOption
            }}
          >
            Submit
          </button>

          {isStudentLoggedIn && (
            <p className="register-container">
              <span>Don't have an account?</span> {/* Add the sentence */}
              <button
                className="register-text-button" // Update class name
                onClick={() => setSelectedOption("Register")} // Show registration form
              >
                Register
              </button>
            </p>
          )}
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
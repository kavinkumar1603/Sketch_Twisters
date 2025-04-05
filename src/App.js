import React, { useState } from 'react';
import './App.css';
import videoSrc from './assests/logodesign.mp4'; // Ensure the folder name matches the actual directory
import AdminProfile from './assests/Admin-Profile.png'; // Import Admin profile image
import StudentProfile1 from './assests/Student-profile1.avif'; // Import Student profile image
import successIcon from './assests/success-icon.png'; // Import success icon image
import image1 from './assests/photo 4.jpg';
import image2 from './assests/photo1.png';
import image3 from './assests/photo2.png';
import image4 from './assests/photo3.jpg';
import image5 from './assests/sivan.jpg';
import image6 from './assests/satoro anime.png';

function App() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState({
    name: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [isMainContentVisible, setIsMainContentVisible] = useState(false); // State for main content visibility

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
    console.log("")
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
      setShowLoginOptions(false); // Close modal
      setSelectedOption(null); // Reset selectedOption
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => {
        setShowSuccessModal(false); // Hide modal after 3 seconds
        setIsMainContentVisible(true); // Show main content
      }, 3000);
    }
  };

  const handleSubmitClick = () => {
    // Logic for handling the "Submit" button click
    setShowLoginOptions(false); // Close modal
    setSelectedOption(null); // Reset selectedOption
    setIsMainContentVisible(true); // Show main content
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
            className="dynamic-submit-button"
            onClick={handleSubmitClick} // Updated to handle "Submit" button click
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

  const renderMainContent = () => {
    return (
      <div className="main-content">
        <header className="success-header">
          <h1>EVENT SPHERE</h1>
          <div className="user-profile">
            <span>{registrationDetails.name || "USER NAME"}</span> {/* Display user's name or fallback to "USER NAME" */}
          </div>
        </header>
        <div className="navigation-menu">
          <ul>
            <li>Home</li>
            <li>Calendar</li>
            <li>Events</li>
            <li>Achievements</li>
            <li>Notifications</li>
          </ul>
        </div>
        <div className="grid-container">
          <div className="grid-item">
            <img src={image1} alt="College Event 1" className="grid-image-1" />
          </div>
          <div className="grid-item">
            <img src={image2} alt="College Event 2" className="grid-image" />
          </div>
          <div className="grid-item">
            <img src={image3} alt="College Event 3" className="grid-image" />
          </div>
          <div className="grid-item">
            <img src={image4} alt="College Event 4" className="grid-image" />
          </div>
        </div>
        <div className="text-container">
          <h2>Welcome to SECE's EventSphere!</h2>
          <p>Your one-stop hub for discovering exciting events, workshops, hackathons, and scholarships at Sri Eshwar College of Engineering and beyond!</p>
          <ul>
            <li>Explore events from departments, clubs, CIR, and GDC</li>
            <li>Register effortlessly & stay updated</li>
            <li>Get instant notifications via WhatsApp</li>
          </ul>
          <p>Never miss an opportunity – Stay connected with SECE's EventSphere!</p>
          <button className="know-more-button">KNOW MORE</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {!isMainContentVisible ? (
        <>
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
        </>
      ) : (
        renderMainContent()
      )}
      {showSuccessModal && (
        <div className="registration-success-modal">
          <div className="registration-success-content">
            <img src={successIcon} alt="Success" className="success-icon" />
            <p className="success-text">Registration Successful!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
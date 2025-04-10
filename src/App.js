import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
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
import TeacherProfile from './assests/teacher-profile.png'; // Import Teacher profile image
import UserProfileImage from './assests/user-profile.jpg'; // Import the provided image
import UserProfileDetails from './UserProfileDetails'; // Ensure correct import

function App() {
  const navigate = useNavigate(); // Initialize useNavigate
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
  const [loggedInUser, setLoggedInUser] = useState(null); // Updated to null initially
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  const handleUserProfileClick = () => {
    navigate("/profile", { state: { user: loggedInUser } }); // Pass user details via state
  };

  const handleLogoutClick = () => {
    setLoggedInUser(null); // Clear the logged-in user
    setIsMainContentVisible(false); // Hide main content
    navigate("/"); // Navigate back to the login page
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

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
    const { id, value } = e.target; // Ensure the 'id' matches the key in the state
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
      setLoggedInUser({
        name: registrationDetails.name,
        id: registrationDetails.studentId,
        role: selectedOption || "Student",
        email: "example@example.com", // Placeholder email
      }); // Save user details
      localStorage.setItem("studentLoggedIn", true); // Save login state
      setShowLoginOptions(false); // Close modal
      setSelectedOption(null); // Reset selectedOption
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => {
        setShowSuccessModal(false); // Hide modal after 3 seconds
        setIsMainContentVisible(true); // Show main content
        navigate("/main"); // Navigate to "/main"
      }, 3000);
    }
  };

  const handleLoginValidation = () => {
    const { name, studentId, password } = registrationDetails;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!studentId) newErrors.studentId = "ID is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmitClick = () => {
    if (handleLoginValidation()) {
      setLoggedInUser({
        name: registrationDetails.name,
        id: registrationDetails.studentId,
        role: selectedOption || "Student",
        email: "example@example.com", // Placeholder email
      });
      setShowLoginOptions(false); // Close modal
      setSelectedOption(null); // Reset selectedOption
      setIsMainContentVisible(true); // Show main content
      navigate("/main"); // Navigate to "/main"
    }
  };

  const renderModalContent = () => {
    if (selectedOption) {
      const isTeacherLoggedIn = selectedOption === "Teacher" && localStorage.getItem("teacherLoggedIn");
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={registrationDetails.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
              <label htmlFor="studentId">ID</label> {/* Corrected the ID field */}
              <input
                type="text"
                id="studentId" // Matches the key in the state
                placeholder="Enter your ID"
                value={registrationDetails.studentId}
                onChange={handleInputChange}
              />
              {errors.studentId && <p className="error-message">{errors.studentId}</p>}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={registrationDetails.password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </>
          )}
          {selectedOption === "Student" && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={registrationDetails.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
              <label htmlFor="studentId">ID</label> {/* Corrected the ID field */}
              <input
                type="text"
                id="studentId" // Matches the key in the state
                placeholder="Enter your ID"
                value={registrationDetails.studentId}
                onChange={handleInputChange}
              />
              {errors.studentId && <p className="error-message">{errors.studentId}</p>}
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={registrationDetails.password}
                onChange={handleInputChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </>
          )}
          <button
            className="dynamic-submit-button"
            onClick={handleSubmitClick} // Updated to handle "Submit" button click
          >
            Submit
          </button>

          {(isTeacherLoggedIn || isStudentLoggedIn) && (
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
          <div className="login-option">
            <img src={TeacherProfile} alt="Teacher" className="login-option-image" />
            <button
              className="login-option-button"
              onClick={() => setSelectedOption("Teacher")}
            >
              Teacher
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    const handleNavigationClick = (section) => {
      console.log(`Navigating to: ${section}`);
      // Add logic for navigation if needed
    };

    return (
      <div className="main-content">
        <header className="success-header">
          <h1 className="main-heading">EVENTSPHERE</h1>
          <div className="navigation-menu">
            <ul>
              <li onClick={() => handleNavigationClick("Home")}>Home</li>
              <li onClick={() => handleNavigationClick("Calendar")}>Calendar</li>
              <li onClick={() => handleNavigationClick("Events")}>Events</li>
              <li onClick={() => handleNavigationClick("Achievements")}>Achievements</li>
              <li onClick={() => handleNavigationClick("Notifications")}>Notifications</li>
            </ul>
          </div>
          <div className="user-profile" onClick={toggleDropdown}>
            <img src={UserProfileImage} alt="User Profile" />
            <span>{loggedInUser?.name || "USER NAME"}</span>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleUserProfileClick}>User Profile</button>
                <button onClick={handleLogoutClick}>Log Out</button>
              </div>
            )}
          </div>
        </header>
        <div className="grid-container">
          <div className="grid-item">
            <img src={image1} alt="College Event 1" className="grid-image-top-left" />
          </div>
          <div className="grid-item">
            <img src={image2} alt="College Event 2" className="grid-image-top-right" />
          </div>
          <div className="grid-item">
            <img src={image3} alt="College Event 3" className="grid-image-bottom-left" />
          </div>
          <div className="grid-item">
            <img src={image4} alt="College Event 4" className="grid-image-bottom-right" />
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
      <Routes>
        <Route
          path="/"
          element={
            !isMainContentVisible ? (
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
            )
          }
        />
        <Route
          path="/main"
          element={renderMainContent()} // Route for main content
        />  
        <Route
          path="/profile"
          element={<UserProfileDetails />} // No props passed here
        />
      </Routes>
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
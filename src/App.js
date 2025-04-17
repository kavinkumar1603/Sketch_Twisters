import React, { useState, useRef } from 'react'; // Add useRef
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
import TeacherProfile from './assests/teacher-profile.png'; // Import Teacher profile image
import UserProfileImage from './assests/user-profile.jpg'; // Import the provided image
import UserProfileDetails from './UserProfileDetails'; // Ensure correct import
import card1 from './assests/card1.png'; // Import card image
import card2 from './assests/card2.jpeg'; // Import card image
import card3 from './assests/card3.jpeg'; // Import card image
import card4 from './assests/card4.jpg'; // Import card image
import card5 from './assests/card5.JPG'; // Import card image
import AchievementsPage from './AchievementsPage'; // Import the AchievementsPage component
import AddAchievementPage from './AddAchievementPage'; // Import the AddAchievementPage component

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
  const [showEventsDropdown, setShowEventsDropdown] = useState(false); // State for Events dropdown
  const imageGridRef = useRef(null); // Reference for the image grid container
  const cardSectionRef = useRef(null); // Reference for the card section
  const [achievements, setAchievements] = useState([]); // State to store achievements

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

  const handleFillDetailsClick = () => {
    setLoggedInUser((prevUser) => ({
      ...prevUser,
      isEditing: true, // Enable editing mode
    }));
  };

  const handleSaveDetailsClick = (newDepartment) => {
    setLoggedInUser((prevUser) => ({
      ...prevUser,
      department: newDepartment || "N/A", // Save the updated department
      isEditing: false, // Disable editing mode
    }));
  };

  const handleAddAchievement = (newAchievement) => {
    setAchievements((prev) => [...prev, newAchievement]); // Add new achievement
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

  const toggleUserDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".user-profile")) {
        setShowDropdown(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleKnowMoreClick = () => {
    if (cardSectionRef.current) {
      cardSectionRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the card section
    }
  };

  const handleAchievementsClick = () => {
    navigate("/achievements"); // Navigate to the achievements page
  };

  const renderCardSection = () => {
    return (
      <div className="card-section-container">
        <h2 className="card-section-title">Why you are here?</h2>
        <p className="card-section-description">
            Explore our exciting events, workshops, and opportunities!
          </p>
        <div className="card-section">
          <div className="card">
            <img src={card1} alt="Event Calendar" className="card-image" />
            <p className="card-description">Stay Organized. Stay Ahead.</p>
            <p>View all upcoming events in a single glance and plan your participation with ease.</p>
            <button className="styled-button">EVENT CALENDAR</button>
          </div>
          <div className="card">
            <img src={card2} alt="On Campus Events" className="card-image" />
            <p className="card-description">Happening at SECE!</p>
            <p>Explore events from your departments, clubs, CIR, GDC, and more – all in one place.</p>
            <button className="styled-button">ON CAMPUS EVENTS</button>
          </div>
          <div className="card">
            <img src={card3} alt="Off Campus Events" className="card-image" />
            <p className="card-description">Go Beyond the Campus.</p>
            <p>Discover inter-college fests, competitions, and tech events to showcase your skills.</p>
            <button className="styled-button">OFF CAMPUS EVENTS</button>
          </div>
          <div className="card">
            <img src={card4} alt="Achievements" className="card-image" />
            <p className="card-description">SECE Stars Shine Here!</p>
            <p>Celebrate the victories and milestones of our talented students and teams.</p>
            <button className="styled-button" onClick={handleAchievementsClick}>ACHIEVEMENTS</button>
          </div>
          <div className="card">
            <img src={card5} alt="Scholarships" className="card-image" />
            <p className="card-description">Opportunities that Support You.</p>
            <p>Find scholarships and grants that match your academic and career goals.</p>
            <button className="styled-button">SCHOLARSHIPS</button>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <div className="main-content">
        <header className="success-header">
          <h1 className="main-heading">EVENTSPHERE</h1>
          <div className="navigation-menu">
            <ul>
              <li onClick={() => navigate('/main')}>Home</li>
              <li>Calendar</li>
              <li>
                Events
                <ul className="dropdown-menu-1">
                  <li className="dropdown-item">Departments</li>
                  <li className="dropdown-item">Verticals</li>
                  <li className="dropdown-item">Google Developer Groups</li>
                  <li className="dropdown-item">Center for International Relations</li>
                  <li className="dropdown-item">Higher Education Cell</li>
                </ul>
              </li>
              <li onClick={() => navigate('/achievements')}>Achievements</li> {/* Navigate to achievements page */}
              <li>Notifications</li>
            </ul>
          </div>
          <div className="user-profile" onClick={toggleUserDropdown}>
            <img src={UserProfileImage} alt="User Profile" className="user-profile-image" />
            <span>{loggedInUser?.name || "USER NAME"}</span>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-button" onClick={handleUserProfileClick}>
                    User Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-button" onClick={handleLogoutClick}>
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </header>
       
        <div className="grid-container" ref={imageGridRef}> {/* Add ref to the grid container */}
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
          <button className="know-more-button" onClick={handleKnowMoreClick}>
            KNOW MORE
          </button>
        </div>
        <div className="card-section-container" ref={cardSectionRef}>
          
         
        </div>
      </div>
    );
  };

  const renderUserProfile = () => {
    if (!loggedInUser) {
      return (
        <div className="profile-page">
          <div className="profile-card">
            <h2 className="profile-title">No User Logged In</h2>
            <p>Please log in to view your profile details.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2 className="profile-title">{loggedInUser.name || "User Name"}</h2>
          <div className="profile-avatar">
            <img src={UserProfileImage} alt="User Avatar" className="avatar-image" />
          </div>
          <div className="profile-details">
            <p><strong>ID:</strong> {loggedInUser.id || "N/A"}</p>
            <p><strong>Email:</strong> {loggedInUser.email || "N/A"}</p>
            <p><strong>Role:</strong> {loggedInUser.role || "N/A"}</p>
            <p>
              <strong>Department:</strong>
              {loggedInUser.isEditing ? (
                <>
                  <input
                    type="text"
                    defaultValue={loggedInUser.department || ""}
                    onChange={(e) =>
                      setLoggedInUser((prevUser) => ({
                        ...prevUser,
                        department: e.target.value,
                      }))
                    }
                    autoFocus
                    className="editable-input"
                  />
                  <button
                    className="save-details-button styled-button"
                    onClick={() => handleSaveDetailsClick(loggedInUser.department)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <span>{loggedInUser.department || "N/A"}</span>
              )}
            </p>
            {!loggedInUser.isEditing && (
              <button 
                className="fill-details-button styled-button" 
                onClick={handleFillDetailsClick}
              >
                Edit Details
              </button>
            )}
          </div>
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
          element={
            <>
              {renderMainContent()}
              {renderCardSection()} {/* Render the card section */}
            </>
          }
        />  
        <Route
          path="/profile"
          element={
            <UserProfileDetails
              user={loggedInUser}
              onLogout={handleLogoutClick} // Pass logout function
            />
          }
        />
        <Route
          path="/main/profile" // Add this route
          element={<UserProfileDetails />} // Render UserProfileDetails for /main/profile
        />
        <Route
          path="/achievements"
          element={
            <AchievementsPage
              achievements={achievements}
              user={loggedInUser}
              onLogout={handleLogoutClick} // Pass logout function
            />
          }
        />
        <Route
          path="/add-achievement"
          element={
            <AddAchievementPage
              onAddAchievement={handleAddAchievement}
              user={loggedInUser}
              onLogout={handleLogoutClick} // Pass logout function
            />
          }
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
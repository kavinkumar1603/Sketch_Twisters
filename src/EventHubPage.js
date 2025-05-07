import React from 'react';
import './App.css'; // Ensure the CSS file contains styles for the event hub page

const EventHubPage = ({ user, onLogout }) => {
  return (
    <div className="event-hub-page">
      <header className="event-hub-header">
        <h1 className="event-hub-title">The Event Hub</h1>
        <nav className="event-hub-nav">
          <ul>
            <li>ON Campus</li>
            <li>OFF Campus</li>
          </ul>
        </nav>
        <div className="event-hub-categories">
          <button>Departments</button>
          <button>Verticals</button>
          <button>GDG</button>
          <button>CIR</button>
          <button>HEC</button>
          <button>Centre for Innovation</button>
          <button>Events</button>
          <button>Internships</button>
          <button>Scholarships</button>
        </div>
      </header>
      <main className="event-hub-content">
        <h2 className="trending-title">TRENDING!!</h2>
        <div className="trending-cards">
          {/* HANAMI 2025 Card */}
          <div className="trending-card">
            <div className="trending-image"></div>
            <h3>HANAMI 2025 – Bloom Beyond Borders</h3>
            <p>Presented by the Higher Education Cell, SECE</p>
            <button>REGISTER HERE!</button>
          </div>

          {/* ALSTOM SCHOLARSHIP Card */}
          <div className="trending-card">
            <div className="trending-image"></div>
            <h3>ALSTOM SCHOLARSHIP!</h3>
            <p>
              Offered through Buddy4Study, the Alstom India Scholarship supports bright engineering students from underprivileged backgrounds with financial aid up to ₹75,000 per year.
            </p>
            <button>CHECK OUT!</button>
          </div>

          {/* IDEATHON 2025 Card */}
          <div className="trending-card">
            <div className="trending-image"></div>
            <h3>IDEATHON 2025 – Ignite. Innovate. Impact.</h3>
            <p>
              Powered by the Centre for Innovation, SECE. Got a spark of an idea? Turn it into something big at IDEATHON 2025 – where imagination meets innovation! 🚀
            </p>
            <button>REGISTER HERE!</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventHubPage;

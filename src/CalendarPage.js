import React, { useState } from 'react';
import './App.css';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('2025-05-09');

  const events = [
    {
      id: 1,
      tag: 'Tech',
      title: 'Annual Tech Symposium',
      organizer: 'Organized by Computer Science Dept',
      date: '2025-05-09',
      time: '9:00 AM - 5:00 PM',
      location: 'Main Auditorium, SECE Campus',
    },
    {
      id: 2,
      tag: 'Cultural',
      title: 'Cultural Fest 2025',
      organizer: 'Organized by Arts Club',
      date: '2025-05-10',
      time: '10:00 AM - 6:00 PM',
      location: 'Open Grounds, SECE Campus',
    },
    {
      id: 3,
      tag: 'Career',
      title: 'Career Guidance Workshop',
      organizer: 'Organized by CIR',
      date: '2025-05-09',
      time: '2:00 PM - 4:00 PM',
      location: 'Seminar Hall, SECE Campus',
    },
  ];

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-sidebar">
        <h2>Event Calendar</h2>
        <div className="calendar-widget">
          <p>May 2025</p>
          <div className="calendar-navigation">
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
          <div className="calendar-grid">
            {[...Array(31)].map((_, index) => {
              const day = index + 1;
              const date = `2025-05-${day.toString().padStart(2, '0')}`;
              return (
                <button
                  key={date}
                  className={`calendar-day ${
                    selectedDate === date ? 'selected' : ''
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        <div className="legend">
          <h3>Legend</h3>
          <ul>
            <li className="tech">
              <span></span> Tech Events
            </li>
            <li className="cultural">
              <span></span> Cultural Events
            </li>
            <li className="career">
              <span></span> Career Events
            </li>
          </ul>
        </div>
      </div>
      <div className="event-list">
        <h2>Events on {selectedDate}</h2>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className={`event-tag ${event.tag.toLowerCase()}`}>
                {event.tag}
              </div>
              <h3>{event.title}</h3>
              <p className="event-organizer">{event.organizer}</p>
              <p className="event-details">
                <span>{event.time}</span> | <span>{event.location}</span>
              </p>
              <button className="view-details-button">View Details</button>
            </div>
          ))
        ) : (
          <p>No events scheduled for this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;

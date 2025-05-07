import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

const CalendarPage = ({ user }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });
  const [selectedView, setSelectedView] = useState('month');
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setStoredUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setStoredUser(user);
    }
  }, [user]);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert('Please fill in all fields before adding an event.');
      return;
    }
    setEvents((prevEvents) => [...prevEvents, { ...newEvent, id: Date.now() }]);
    setShowAddEventModal(false);
    setNewEvent({ title: '', start: '', end: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const handleClearEvents = () => {
    if (window.confirm('Are you sure you want to clear all events?')) {
      setEvents([]);
      localStorage.removeItem('calendarEvents');
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#2575fc',
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        textAlign: 'center',
        fontSize: '0.9rem',
      },
    };
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>Event Calendar</h1>
        <div className="view-buttons">
          <button
            className={selectedView === 'day' ? 'active' : ''}
            onClick={() => handleViewChange('day')}
          >
            Day
          </button>
          <button
            className={selectedView === 'week' ? 'active' : ''}
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>
          <button
            className={selectedView === 'month' ? 'active' : ''}
            onClick={() => handleViewChange('month')}
          >
            Month
          </button>
        </div>
        {(storedUser && (storedUser.role === 'Admin' || storedUser.role === 'Teacher')) && (
          <div className="action-buttons">
            <button className="add-event-button" onClick={() => setShowAddEventModal(true)}>
              + Add Event
            </button>
            <button className="clear-events-button" onClick={handleClearEvents}>
              Clear Events
            </button>
          </div>
        )}
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        view={selectedView}
        onView={setSelectedView}
        style={{ height: 500, margin: '20px' }}
        eventPropGetter={eventStyleGetter}
      />
      {showAddEventModal && (
        <div className="add-event-modal">
          <div className="modal-content">
            <h2>Add Event</h2>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Start Date:
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddEvent}>Add Event</button>
              <button onClick={() => setShowAddEventModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;

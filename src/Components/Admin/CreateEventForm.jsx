import React, { useState } from 'react';

const CreateEventForm = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    eventDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save the event, maybe API call or state update
    console.log('Event Created:', eventData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter event name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={eventData.eventDate}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Event Description</label>
          <textarea
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter event description"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;

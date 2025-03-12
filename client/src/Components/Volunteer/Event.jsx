import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Community Clean-Up",
      date: "Mar 15, 2025",
      location: "Riverside Park",
      participants: 18
    },
    {
      id: 2,
      title: "Charity Fundraiser",
      date: "Mar 22, 2025",
      location: "Community Center",
      participants: 35
    }
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-4xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 sm:text-lg md:text-xl">Upcoming Events</h2>
          <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full  font-medium hover:bg-blue-200 transition-colors sm:px-2 sm:py-1 text-xs">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="border border-gray-100 rounded-lg p-6 hover:bg-blue-50 transition-colors shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4 mb-4 sm:mb-0">
                  <FaCalendarAlt size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 sm:text-base">{event.title}</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600 text-sm sm:text-xs">
                      <FaCalendarAlt className="mr-2" size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm sm:text-xs">
                      <FaMapMarkerAlt className="mr-2" size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm sm:text-xs">
                      <FaUsers className="mr-2" size={14} />
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm sm:px-3 sm:py-1.5 text-sm">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;

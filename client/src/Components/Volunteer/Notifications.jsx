import React from 'react';
import { FaBell, FaCalendarCheck, FaUserCheck } from 'react-icons/fa';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      icon: <FaCalendarCheck />,
      message: "Event Community Clean-Up is scheduled for tomorrow.",
      time: "1 hour ago",
      type: "event"
    },
    {
      id: 2,
      icon: <FaUserCheck />,
      message: "You have been assigned to the Registration Desk role for Charity Fundraiser.",
      time: "2 days ago",
      type: "assignment"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-6 sm:p-4 md:p-6 lg:p-8 xl:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 sm:text-lg md:text-xl">Notifications</h2>
          <div className="relative">
            <FaBell className="text-blue-600 text-xl sm:text-lg md:text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full sm:w-5 sm:h-5 sm:text-sm">
              2
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`flex items-start p-3 rounded-lg border-l-4 shadow-md ${
                notification.type === 'event' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-green-500 bg-green-50'
              } sm:p-2 md:p-3`}
            >
              <div className={`p-2 rounded-lg mr-3 ${
                notification.type === 'event' 
                  ? 'bg-blue-200 text-blue-600' 
                  : 'bg-green-200 text-green-600'
              } sm:p-1 md:p-2`}>
                {notification.icon}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-sm sm:text-xs md:text-sm">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-1 block sm:text-xs md:text-sm">{notification.time}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 sm:text-sm">
                <svg className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-5 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium hover:bg-blue-100 transition-colors sm:py-1.5 sm:text-sm md:py-2 md:text-base">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;

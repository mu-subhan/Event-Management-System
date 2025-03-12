import React from 'react';
import { FaClock, FaCalendarAlt, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const VolunteerImpact = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl sm:p-4 md:p-6 lg:p-8 xl:p-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 sm:text-lg md:text-xl">Your Impact</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-3">
            <FaClock size={24} />
          </div>
          <p className="text-gray-600 text-sm">Total Hours</p>
          <p className="text-3xl font-bold text-gray-800">50</p>
        </div>
        
        <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-green-100 text-green-600 p-3 rounded-full mb-3">
            <FaCalendarAlt size={24} />
          </div>
          <p className="text-gray-600 text-sm">Events</p>
          <p className="text-3xl font-bold text-gray-800">10</p>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-full mb-3">
            <FaUsers size={24} />
          </div>
          <p className="text-gray-600 text-sm">People Helped</p>
          <p className="text-3xl font-bold text-gray-800">120</p>
        </div>
        
        <div className="bg-yellow-50 rounded-xl p-4 flex flex-col items-center">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full mb-3">
            <FaHandHoldingHeart size={24} />
          </div>
          <p className="text-gray-600 text-sm">Causes Supported</p>
          <p className="text-3xl font-bold text-gray-800">8</p>
        </div>
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2 sm:text-base md:text-lg">Your Contribution Matters</h3>
        <p className="mb-4 text-sm sm:text-xs md:text-sm">Your volunteering has made a significant impact in our community. Keep up the great work!</p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button className="px-4 py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors sm:w-auto w-full">
            See Impact Report
          </button>
          <button className="px-4 py-2 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors sm:w-auto w-full">
            Share Your Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerImpact;

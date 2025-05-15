import React from 'react';
import { FaClock, FaCalendarAlt, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const VolunteerImpact = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 min-h-[550px] transition-all duration-300 hover:shadow-2xl sm:p-6 md:p-8 lg:p-10 xl:p-12 w-full">
<h2 className="text-xl font-semibold text-gray-800 mb-2 sm:text-lg md:text-xl">Your Impact</h2>
<p className="text-gray-800 text-sm mb-6 sm:text-xs md:text-lg">
  Every hour you’ve given builds a stronger, more compassionate community — thank you for making a real difference.
</p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
            <FaClock size={28} />
          </div>
          <p className="text-gray-500 text-sm">Total Hours</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">50</p>
        </div>

        <div className="bg-green-50 rounded-xl p-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <div className="bg-green-100 text-green-600 p-4 rounded-full mb-4">
            <FaCalendarAlt size={28} />
          </div>
          <p className="text-gray-500 text-sm">Events</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">10</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-4">
            <FaUsers size={28} />
          </div>
          <p className="text-gray-500 text-sm">People Helped</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">120</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full mb-4">
            <FaHandHoldingHeart size={28} />
          </div>
          <p className="text-gray-500 text-sm">Causes Supported</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">8</p>
        </div>
      </div>

      <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-md mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-center">Your Contribution Matters</h3>
        <p className="mb-6 text-lg text-center">Your volunteering has made a significant impact in our community. Keep up the great work!</p>
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0">
          {/* <button className="px-5 py-2 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition-colors sm:w-auto w-full">
            See Impact Report
          </button> */}
          {/* 
          <button className="px-5 py-2 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-blue-700 transition-colors sm:w-auto w-full">
            Share Your Story
          </button> 
          */}
        </div>
      </div>
    </div>
  );
};

export default VolunteerImpact;

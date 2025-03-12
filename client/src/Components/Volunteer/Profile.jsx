import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
          <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
            Edit
          </button>
        </div>
        
        <div className="flex items-center space-x-6 mb-6 shadow-xl p-4 rounded-lg">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white shadow-md">
            MS
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800">Muhammad Subhan</h3>
            <p className="text-blue-600 font-medium">Volunteer since 2023</p>
            <div className="mt-2 flex items-center">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">Available</span>
              <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">5★ Rating</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-600 mt-6">
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
            <span>johne@example.com</span>
          </div>
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaPhone className="w-5 h-5 mr-3 text-blue-500" />
            <span>+92 312-3456789</span>
          </div>
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaMapMarkerAlt className="w-5 h-5 mr-3 text-blue-500" />
            <span>Lahore, Pak</span>
          </div>
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaBriefcase className="w-5 h-5 mr-3 text-blue-500" />
            <span>Software Engineer</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-medium text-gray-700 mb-2">Preferred Causes</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Environment</span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Education</span>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">Homelessness</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

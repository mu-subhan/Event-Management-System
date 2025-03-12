import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import EventList from './EventList';
import RoleSuggestionPanel from './RoleSuggestionPanel';
import { FaChartBar, FaListAlt, FaUserShield } from 'react-icons/fa';
import userImage from "../../Assessts/subhanImage.png";

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      

      {/* Main Content Area */}
      <div className={`flex-1 ml-64 transition-all duration-300 ${location.pathname === '/admin/dashboard' ? 'ml-64' : ''}`}>
        
        {/* Top Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="relative">
              <img src={userImage} className="w-12 h-12 rounded-full" alt="Admin" />
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="">
          {/* Dashboard Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                    <FaListAlt className="text-blue-500 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                    <h3 className="text-3xl font-bold text-gray-800">15</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm text-green-600">
                  <span className="font-medium">+4%</span> from last month
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                    <FaUserShield className="text-purple-500 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Volunteers</p>
                    <h3 className="text-3xl font-bold text-gray-800">50</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm text-green-600">
                  <span className="font-medium">+12%</span> from last month
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                    <FaChartBar className="text-green-500 text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Events Completed</p>
                    <h3 className="text-3xl font-bold text-gray-800">5</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm text-green-600">
                  <span className="font-medium">+25%</span> from last month
                </div>
              </div>
            </div>
          </div>

          {/* Event List Section */}
          <EventList />
          
          {/* Role Suggestions Section */}
          <RoleSuggestionPanel/>
          
        </main>
      </div>
    </div>
  );
};

const DashboardWithRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default DashboardWithRouter;

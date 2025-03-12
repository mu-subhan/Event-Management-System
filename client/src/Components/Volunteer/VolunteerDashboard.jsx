import React from 'react';
import Profile from './Profile';
import Events from './Event';
import Skills from './Skills';
import Notifications from './Notifications';
import VolunteerImpact from './VolunteerImpact';
import { Route, Routes } from 'react-router-dom';


const VolunteerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
    
      
      <div className="flex-1 p-4 sm:p-8">
        <div className="max-w-full">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Subhan!</h1>
            <p className="text-gray-600 mt-1">Your volunteering journey continues</p>
            
            {/* Stats section - Grid layout */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">Total Hours</h3>
                <p className="text-3xl font-bold">50</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">Events</h3>
                <p className="text-3xl font-bold">10</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <p className="text-3xl font-bold">3</p>
              </div>
            </div>
          </header>
          
          {/* Main content - Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <Events />
            {/* <Notification/>
            <Profile/> */}
            <Skills />
          </div>

          {/* Volunteer Impact section */}
          <div className="mt-8">
            <VolunteerImpact />
          </div>
        </div>
      </div>
    </div>
  );
};
// export default VolunteerDashboard

const VolunteerDashboardWithRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<VolunteerDashboard />} />
    </Routes>
  );
};

export default VolunteerDashboardWithRouter;

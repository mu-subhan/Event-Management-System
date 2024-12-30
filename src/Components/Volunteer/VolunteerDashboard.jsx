import React from 'react';
import Profile from './Profile';
import Events from './Event';
import Skills from './Skills';
import Notifications from './Notifications';
import VolunteerImpact from './VolunteerImpact';
import Sidebar from './Sidebar';

const VolunteerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Volunteer Dashboard</h1>
        
        <Profile />
        <Events />
        <Skills />
        <Notifications />
        <VolunteerImpact />
      </div>
    </div>
  );
};

export default VolunteerDashboard;

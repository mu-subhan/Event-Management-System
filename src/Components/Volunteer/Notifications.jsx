import React from 'react';

const Notifications = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg">Event "Community Clean-Up" is scheduled for tomorrow.</p>
          <span className="text-sm text-gray-500">1 hour ago</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg">You have been assigned to the "Registration Desk" role for "Charity Fundraiser".</p>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

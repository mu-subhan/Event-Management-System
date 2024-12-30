import React from 'react';

const Events = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Community Clean-Up</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Join</button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Charity Fundraiser</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Join</button>
        </div>
      </div>
    </div>
  );
};

export default Events;

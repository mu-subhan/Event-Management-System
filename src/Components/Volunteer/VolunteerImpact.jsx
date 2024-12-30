import React from 'react';

const VolunteerImpact = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
      <div className="space-y-4">
        <p className="text-lg">Total Volunteer Hours: <strong>50 hours</strong></p>
        <p className="text-lg">Events Participated: <strong>10 events</strong></p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">See More</button>
      </div>
    </div>
  );
};

export default VolunteerImpact;

import React from 'react';

const Profile = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-semibold text-lg">John Doe</p>
            <p className="text-gray-600">johndoe@example.com</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;

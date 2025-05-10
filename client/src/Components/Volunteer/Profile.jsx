import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Muhammad Subhan",
    email: "johne@example.com",
    phone: "+92 312-3456789",
    location: "Lahore, Pak",
    profession: "Software Engineer",
    causes: ["Environment", "Education", "Homelessness"]
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCauseChange = (index, value) => {
    const newCauses = [...editData.causes];
    newCauses[index] = value;
    setEditData(prev => ({
      ...prev,
      causes: newCauses
    }));
  };

  const addCause = () => {
    setEditData(prev => ({
      ...prev,
      causes: [...prev.causes, ""]
    }));
  };

  const removeCause = (index) => {
    setEditData(prev => ({
      ...prev,
      causes: prev.causes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
          {!isEditing ? (
            <button 
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              Edit
            </button>
          ) : (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium hover:bg-green-200 transition-colors flex items-center"
              >
                <FaSave className="mr-1" /> Save
              </button>
              <button 
                onClick={handleCancel}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition-colors flex items-center"
              >
                <FaTimes className="mr-1" /> Cancel
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-6 mb-6 shadow-xl p-4 rounded-lg">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white shadow-md">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="font-bold text-xl text-gray-800 w-full p-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <>
                <h3 className="font-bold text-xl text-gray-800">{profile.name}</h3>
                <p className="text-blue-600 font-medium">Volunteer since 2023</p>
                <div className="mt-2 flex items-center">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">Available</span>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">5★ Rating</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-4 text-gray-600 mt-6">
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaPhone className="w-5 h-5 mr-3 text-blue-500" />
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <span>{profile.phone}</span>
            )}
          </div>
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaMapMarkerAlt className="w-5 h-5 mr-3 text-blue-500" />
            {isEditing ? (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full p-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <span>{profile.location}</span>
            )}
          </div>
          <div className="flex items-center shadow-md p-4 rounded-lg">
            <FaBriefcase className="w-5 h-5 mr-3 text-blue-500" />
            {isEditing ? (
              <input
                type="text"
                value={editData.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                className="w-full p-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              />
            ) : (
              <span>{profile.profession}</span>
            )}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h4 className="font-medium text-gray-700 mb-2">Preferred Causes</h4>
          {isEditing ? (
            <div className="space-y-2">
              {editData.causes.map((cause, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={cause}
                    onChange={(e) => handleCauseChange(index, e.target.value)}
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200 focus:outline-none focus:border-blue-500"
                  />
                  <button 
                    onClick={() => removeCause(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button 
                onClick={addCause}
                className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                + Add Cause
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.causes.map((cause, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {cause}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;